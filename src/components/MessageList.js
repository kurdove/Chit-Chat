import React, { Component } from 'react';
import '.././styles/MessageList.css';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state={
      rooms:[],
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({rooms: this.state.rooms.concat(room)});
     });
   }

   render() {
     let activeRoom=this.props.activeRoom

     let currentMessages=(
       this.state.rooms.map( message => {
         if (message.name===activeRoom) {
         return <ul key = {message.key}>{message.content}</ul>
        }
        return null;
       })
     )

     return (
       <section className="messages-container">
         <h1>Current room: {activeRoom}</h1>
         <div>{currentMessages}</div>
       </section>
     );
   }
   }

export default RoomList
