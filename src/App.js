import React, { Component } from 'react';
import logo from './ChatLogo.svg';
import './App.css';
import * as firebase from 'firebase'
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  var config = {
    apiKey: "AIzaSyAnoUBxAofWkV-Cy8JXgqtJaSFdexZM0Tg",
    authDomain: "bloc-chat-react-c9b00.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-c9b00.firebaseio.com",
    projectId: "bloc-chat-react-c9b00",
    storageBucket: "bloc-chat-react-c9b00.appspot.com",
    messagingSenderId: "446417140922"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state={
    activeRoom: '',
    user: null
    };
    this.setActiveRoom=this.setActiveRoom.bind(this);
    this.setUser=this.setUser.bind(this);
  }

  setActiveRoom(room){
    this.setState({activeRoom: room});
    console.log('Active room clicked', room.roomId);
  }

  setUser(user){
    this.setState({user: user});
  }

  render() {
    let currentUser=this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
        <header className="App-header">
          <div className="Logo-container">
            <h1 className="centered">B</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1 className="App-title">Bloc Chat </h1>
        </header>

        <section className="Signin-container">
          <User
          firebase={firebase}
          setUser={this.setUser}
          currentUser={currentUser}/>
        </section>

        <aside className="Side-bar">
          <RoomList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom}/>
        </aside>

        <aside className="Message-container">
          <MessageList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom}
          activeRoom={this.state.activeRoom}
          currentUser={currentUser}/>
        </aside>

      </div>

    );
  }
}

export default App;
