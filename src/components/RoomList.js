import React, { Component } from 'react';
import '.././styles/RoomList.css';

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
     this.createRoom();
 }

  handleChange(e) {
    e.preventDefault();
    // console.log('change')
    this.setState({newRoomName: e.target.value});
  }

   render() {
     return (
       <section>

         <h1> Room List </h1>
         {this.state.rooms.map( room =>
            <ul key={room.key}>
             <li>
               {room.name}
             </li>
            </ul>
         )}

         <section className="new-room-form">
           <form onSubmit={this.handleSubmit}>
             <span>Create New Room:<br/></span>
             <input type="text" placeholder="New Room" onChange={this.handleChange} />
             <input type="submit" value="CREATE"/>
           </form>
         </section>

       </section>
     );
   }
   }

export default RoomList
