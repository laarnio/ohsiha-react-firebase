import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDEcJF3o0OGYk1S4aG5Wd17R7qRkrcAvrQ",
    authDomain: "ohsiha-55ec6.firebaseapp.com",
    databaseURL: "https://ohsiha-55ec6.firebaseio.com",
    storageBucket: "ohsiha-55ec6.appspot.com",
    messagingSenderId: "317737353794"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
