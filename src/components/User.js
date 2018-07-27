import React, { Component } from 'react';
import '.././styles/User.css';

class User extends Component{
  constructor(props){
    super(props);
    this.state={  };
    this.signInWithPopup=this.signInWithPopup.bind(this);
    this.signOut=this.signOut.bind(this);
  }

  signInWithPopup(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
});
  }

     render() {
       let currentUser = this.props.user.displayName;

     return (
       <section className="User-container">
        <span>DisplayName: {currentUser} </span>
        <button className="Buttons" onClick={this.signOut()}>Leave</button>
        <button className="Buttons" onClick={this.signInWithPopup()}>Sign-in</button>
       </section>
     );
   }
   }

export default User
