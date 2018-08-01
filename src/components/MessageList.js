import React, { Component } from 'react';
import '.././styles/MessageList.css';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state={
      rooms:[],
      username:'',
      content: '',
      sentAt: '',
      roomId: ''
      // newMessage: '',
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({rooms: this.state.rooms.concat(room)});
     });
   }

   createMessage(e){
     this.roomsRef.push({
       username: this.props.currentUser,
       content: this.state.content,
       sentAt: this.state.sentAt,
       roomId: this.state.roomId
     });
     this.setState({room: '', sentAt: '', roomId: ''});
     e.target.reset()
   }
// sentAt: this.props.firebase.database.ServerValue.TIMESTAMP

    handleSubmit(e){
      e.preventDefault();
      this.createMessage(e);
    }

    handleChange(e){
      e.preventDefault();
      this.setState({
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key,
        username: this.props.currentUser
      });
    }

   render() {
     let activeRoom=this.props.activeRoom.key;

     let currentMessages=(
       this.state.rooms.map( message => {
         if (message.roomId===activeRoom) {
         return <ul key = {message.key}>{message.content} {message.sentAt}</ul>
        }
        return null;
       })
     )



     return (
       <section className="messages-container">

         <h1>Current room: {this.props.activeRoom.name}</h1>
         <div>{currentMessages}</div>

         <form className="create-message" onSubmit={this.handleSubmit}>
           <input type="text" placeholder="Type message right here" onChange={this.handleChange}/>
           <input type="submit" value="CREATE"/>
         </form>

       </section>

     );
   }
   }

export default RoomList
