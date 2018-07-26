import React, { Component } from 'react';
import '.././styles/RoomList.css';
// import App from '.././App';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state={
      rooms:[],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
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

  createRoom(newRoomName) {
    this.roomsRef.push({ name: newRoomName});
    this.setState({ newRoomName: '' });
 }

   handleSubmit(e){
     e.preventDefault();
     this.createRoom(this.state.newRoomName);
 }

  handleChange(e) {
    e.preventDefault();
    this.setState({newRoomName: e.target.value});
  }

  // roomOnClick(x){
  //   console.log('Room clicked', x)
  // }

   render() {
     return (
       <section className="Room-list">

         <h1> Room List </h1>
         {this.state.rooms.map( room =>
            <ul key={room.key}>
             <li onClick={()=>this.props.setActiveRoom(room)}>
               {room.name}
             </li>
            </ul>
         )}

         <section className="new-room-form">
           <form onSubmit={this.handleSubmit}>
             <span>Create New Room:<br/></span>
             <input type="text" placeholder="New Room" value={this.state.newRoomName} onChange={this.handleChange} ref="roomName"/>
             <input type="submit" value="CREATE"/>
           </form>
         </section>

       </section>
     );
   }
   }

export default RoomList;
