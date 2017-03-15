import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
class App extends Component {

  
  constructor() {
    super();
    this.state = {
      User: 'Loading'
    };
  }

  componentDidMount() {
    // const rootRef = firebase.database().ref().child('user');
    // const userRef = rootRef.child('9N5BUAM0NxScnSpRQdO9qxhKbqj2');
    // const nameRef = userRef.child('name');
    
    firebase.auth().onAuthStateChanged(firebaseuser => {
      if(firebaseuser) {
        var ref = firebase.database().ref('user/'+firebaseuser.uid).child('nick');
        ref.on('value', result => {
          this.setState({
            User: 'Hello ' + result.val(),
            Login: '',
            Email: '',
            Password: '',
            Logout: <button onClick={this.logout} className="btn btn-primary">Logout</button>
          });
        });
        
        
        
        console.log(firebaseuser.email);
      } else {
        this.setState({
          User: 'Not logged',
          Email: <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/> ,
          Password: <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} /> ,
          Login: <button type="submit" className="btn btn-primary">Login</button>,
          Logout: ''
        });  
      }
    });

  }
  logout() {
    console.log('ulos');
    firebase.auth().signOut();
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(this.email.value, this.pw.value);
    promise.catch(e => console.log(e.message));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ohsiha</h2>
        </div>
        <p className="App-intro">
          {this.state.User}
        </p>
        <form onSubmit={this.handleSubmit}>
          {this.state.Email}
          {this.state.Password}
          {this.state.Login}
          {this.state.Logout}
        </form>
      </div>
    );
  }
}

export default App;
