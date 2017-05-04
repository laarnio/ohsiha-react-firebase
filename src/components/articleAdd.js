import React, { Component } from 'react';
import * as firebase from 'firebase';

class ArticleAdd extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: [],
      user: null
    };
    this.userId = props.userId;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.userReff = firebase.database().ref('user/' + this.userId);

    this.userReff.once('value', (userInfo) => {
      this.setState({user: userInfo.val()});
    });
    
    
  }
  
  handleSubmit = (e) => {
    console.log(this.title.value);
    e.preventDefault();
    var articleRef = firebase.database().ref("article/");
    var newKey = articleRef.push().key;
    var articleAddRef = articleRef.child(newKey);
    articleAddRef.set({
      title: this.title.value,
      article: this.article.value,
      author: this.state.user.nick,
      uid: this.userId
    });
    this.props.showView('articles');
    
  }

  render () {
    return(
      <div>
      <h2>Add article</h2>
      <form onSubmit={this.handleSubmit}>
        <input ref={(title) => this.title = title} type='text' placeholder='Title' />
        <br />
        <textarea ref={(article) => this.article = article} placeholder='Article' rows='4' cols='50' />
        <button type="submit">Post</button>
      </form>
      </div>
    );
  }
}

export default ArticleAdd;
