import React, { Component } from 'react';
import * as firebase from 'firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
   this.handleSignUp = this.handleSignUp.bind(this); 
  }
  
  componentWillMount () {
    
    
  }
  handleSignUp(e){
    e.preventDefault()
    const auth = firebase.auth()
    console.log(this.email.value);
    const email = this.email.value;
    const name = this.name.value;
    const nick = this.nick.value;

    const promise = auth.createUserWithEmailAndPassword(this.email.value, this.pw.value);
    promise.catch(e => console.log(e.message));
    promise.then(function(){
      var user = firebase.auth().currentUser.uid;
      var usersRef = firebase.database().ref("user/"+user);
      usersRef.set({
        email: email,
        name: name,
        nick: nick
      });
    });
  }



  render () {
    return(
      <div>
      <ul>
        <li onClick={() => this.props.showView('login')}>Login</li>
      </ul>
      <h1>Sign Up</h1>
      <form onSubmit={this.handleSignUp}>
        <input type="email"  placeholder="Email" ref={(email) => this.email = email}/>
        <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
        <input type="text" placeholder="Realname" ref={(name) => this.name = name} />
        <input type="text" placeholder="Nickname" ref={(nick) => this.nick = nick} />
        <button type="submit">Sign Up!</button>
      </form>
      </div>
    );
  }
}

export default SignUp;
