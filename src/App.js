import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/login';
import Profile from './components/profile';
import Articles from './components/articleList';
import SignUp from './components/SignUp';
import ArticleAdd from './components/articleAdd';
import ArticleEdit from './components/articleEdit';
import JsonReader from './components/jsonReader';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      view: 'login'
    };

    this.setLogIn = this.setLogIn.bind(this);
    this.logout = this.logout.bind(this);
    this.showView = this.showView.bind(this);
    this.setArticle = this.setArticle.bind(this);
  }

  setLogIn(user) {
    this.setState({
      user: user,
      view: 'profile'
    });
  }

  logout() {
    console.log('ulos');
    alert('Hei hei!');
    firebase.auth().signOut().then(() => this.setState({user: null, view: 'login'}));
    
  }

  showView(viewName) {
    this.setState({view: viewName});
  }

  setArticle(key) {
    this.setState({articleKey: key});
    this.showView('editArticle');

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ohsiha</h2>
        </div>
        {this.state.user ? 
        <ul>
          <li onClick={() => this.showView('main')}>main</li>
          <li onClick={() => this.showView('profile')}>profile</li>
          <li onClick={() => this.showView('articles')}>articles</li>
          <li onClick={() => this.showView('jsonreader')}>JSON reader</li>
          <button onClick={this.logout} className="btn btn-primary">Logout</button>
        </ul>
        : ''}
        {this.state.user ?
        <div>
          <p className="App-intro">
            Username: {this.state.user.nick}
          </p>
        </div>
        :''}
        
        {this.state.view === 'login' ? <Login showView={this.showView} setLogIn={this.setLogIn} /> : ''}
        {this.state.view === 'profile' ? <Profile userId={this.state.user.uid} /> : ''}
        {this.state.view === 'signup' ? <SignUp showView={this.showView} />: ''}
        {this.state.view === 'articles' ? <Articles setArticle={this.setArticle} showView={this.showView} 
          userId={this.state.user.uid} /> : ''}
        {this.state.view === 'addArticle' ? <ArticleAdd showView={this.showView} userId={this.state.user.uid} /> : ''}
        {this.state.view === 'editArticle' ? <ArticleEdit showView={this.showView} articleKey={this.state.articleKey} />: ''}
        {this.state.view === 'jsonreader' ? <JsonReader showView={this.showView} showView={this.showView} userId={this.state.user.uid} />: ''}

      </div>
    );
  }
}

export default App;
