import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';



class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };

    console.log('construct');

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    this.articleRef = firebase.database().ref('article');
    this.articleRef.on('value', (articles) => {
      const newArticles = _(articles.val())
        .mapValues((value, key) => {
          return _.extend(value, {key: key});
        })
        .values()
        .value();

      console.log('uudet artikkelit');

      this.setState({articles: newArticles});
    });    
  }

  componentWillUnmount () {
    this.articleRef.off('value');
  }

  testPrint() {
    
  }

  handleDelete(key) {
    firebase.database().ref('article/' + key).remove();
  }

  render () {
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
          {this.state.articles.map((article) => {
            return (<li key={article.key}>Title: {article.title} <br />
              Article: {article.article} 
              <br />
              Author: {article.author}
              <br />
              
              {article.uid === this.props.userId ? <button onClick={() => this.handleDelete(article.key)}>Delete</button> :''}
              {article.uid === this.props.userId ? <button onClick={() => this.props.setArticle(article.key)}>Edit</button> :''}
              <br /> <br />
            </li>);
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
