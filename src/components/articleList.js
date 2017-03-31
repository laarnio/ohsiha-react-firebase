import React, { Component } from 'react';
import * as firebase from 'firebase';
import ArticleAdd from './articleAdd';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.articles = [];
  }

  componentWillMount () {
    this.articleRef = firebase.database().ref('article');
    this.articleRef.on('child_added', (articles) => {

      const newArticle = Object.assign(articles.val(), {key: articles.key});

      this.articles.push(newArticle);
      this.setState({articles: articles.val()});
    });
    
  }
  testPrint() {
    console.log(this.articles[2]);
  }
  handleDelete(key) {
    firebase.database().ref('article/' + key).remove();
  }

  render () {
    console.log(this.articles);
    return(
      <div>
      <h1>Articles</h1>
      <div>
        <li onClick={() => this.props.showView('addArticle')}>Add Article</li>
      </div>
        <div>
          <li onClick={() => this.testPrint()}>Testii</li>
        </div>
        <ul>
          {this.articles.map(function(article) {
            return (<li key={article.article}>Title: {article.title} <br />
              Article: {article.article} 
              <li onClick={() => this.handleDelete(article.key)}>Delete</li>
              <li onClick={() => this.props.setArticle(article.key)}>Edit</li>
              <br /> <br />
              </li>
              );
                   
          }.bind(this))}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
