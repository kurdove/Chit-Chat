import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import RoomList from './components/RoomList';

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
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <aside>
          <RoomList firebase = {firebase} />
        </aside>
      </div>

    );
  }
}

export default App;
