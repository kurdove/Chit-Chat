import React, { Component } from 'react';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state={rooms:[]};
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({rooms: this.state.rooms.contact(room)});
     });
   }

  render(){
    const roomsList = () => (
      <section>
        <div>
          <h2>Room list will go here</h2>
        </div>
      </section>
    );

    return (
      <section>
        <ul>
          <li>{this.roomsList}</li>
        </ul>
      </section>
    );
  }
}

export default RoomList
