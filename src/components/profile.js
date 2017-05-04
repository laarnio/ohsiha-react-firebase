import React, { Component } from 'react';
import * as firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      user: null
    };

    this.userId = props.userId;
    console.log(this.userId);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount () {

    this.userRef = firebase.database().ref('user/' + this.userId);

    this.userRef.once('value', (userInfo) => {
      this.setState({user: userInfo.val()}); 
    });
  }

  handleChange (evt) {
    const newUserInfo = Object.assign(this.state.user, {[evt.target.name]: evt.target.value});
    this.setState({
      user: newUserInfo
    });
    //this.userRef.update(newUserInfo);
  }

  handleBlur () {
    this.userRef.update(this.state.user);
  }

  render () {
    return(
      <div>
        {this.state.user ?
        <form>
          Email:
          <input name="email" value={this.state.user.email} onChange={this.handleChange} onBlur={this.handleBlur} />
          <br />
          Name:
          <input name="name" value={this.state.user.name} onChange={this.handleChange} onBlur={this.handleBlur} />
          <br />
          Nick:
          <input name="nick" value={this.state.user.nick} onChange={this.handleChange} onBlur={this.handleBlur} />
          <br />
        </form>
        : ''}
      </div>
    );
  }
}

export default Profile;
