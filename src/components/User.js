import React, { Component } from 'react';
import '.././styles/User.css';

class User extends Component{
  constructor(props){
    super(props);
    this.signIn=this.signIn.bind(this);
    this.signOut=this.signOut.bind(this);
  }

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(user){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
});
  }

     render() {
       // let currentUser = this.props.user.displayName;

     return (
       <section className="User-container">
        <span><b>{this.props.currentUser}</b> is signed in </span>
        <button className="Buttons" onClick={this.signIn}>Sign-in</button>
        <button className="Buttons" onClick={this.signOut}>Leave</button>
       </section>
     );
   }
   }

export default User
