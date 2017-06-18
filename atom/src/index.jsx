import React from 'react'
import {render} from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey : 'AIzaSyBey0wU84JT8zhOD64YrlMhLxV_tf-55BY',
    authDomain: 'react-chat-87510.firebaseapp.com',
    databaseURL: 'https://react-chat-87510.firebaseio.com',
    projectId: 'react-chat-87510',
    storageBucket: 'react-chat-87510.firebaseapp.com',
    messagingSenderId: '389820967451'
  });

import App from './components/App'


render(<App />,document.getElementById('root'))