import React, { Component } from 'react';
import * as firebase from 'firebase';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.articleRef = firebase.database().ref('article/').child(this.props.articleKey);
    this.articleRef.on('value', (article) =>{
      this.setState({article: article.val()});
    });
    console.log(this.state.article);
    
  }

  componentWillUnmount(){
    this.articleRef.off('value');
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.articleRef.update(this.state.article);
    this.props.showView('articles');    
  }

  handleChange (evt) {
    const newArticleInfo = Object.assign(this.state.article, {[evt.target.name]: evt.target.value});
    this.setState({
      article: newArticleInfo
    });
  }

  render () {
    return(
      <div>
      <h2>Edit article</h2>
      {this.state.article ? 
      <form onSubmit={this.handleSubmit}>
        <input name="title" value={this.state.article.title} onChange={this.handleChange} />
        <br />
        <textarea name="article" value={this.state.article.article} rows='4' cols='50' onChange={this.handleChange} />
        <button type="submit">Post Edit</button>
      </form>
      : ''}
      </div>

    );
  }
}

export default ArticleEdit;
