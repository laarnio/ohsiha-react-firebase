import React, { Component } from 'react';
import * as firebase from 'firebase';
import Profile from './profile';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        var ref = firebase.database().ref('user/' + firebaseUser.uid);

        ref.on('value', result => {
          console.log(result.val());
          this.props.setLogIn(Object.assign({uid: firebaseUser.uid}, result.val()));
        });        
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(this.email.value, this.pw.value);
    promise.catch(e => console.log(e.message));
  }

  render(){
    console.log(this.props);
      return (
        <div> 
          <ul>
            <li onClick={() => this.props.showView('signup')}>SignUp</li>
          </ul>
          <p >
            Not logged in
          </p>
          <form onSubmit={this.handleSubmit}>
            <input ref={(email) => this.email = email} placeholder="Email"/>
            <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
            <button type="submit">Login</button>
          </form>
          
        </div>
      ); 
    }
  }

export default Login;
