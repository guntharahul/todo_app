// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBnOYviPLcU5FECST9m2_BBo11YfNMRyRc',
  authDomain: 'todo-app-87775.firebaseapp.com',
  databaseURL: 'https://todo-app.firebaseio.com',
  projectId: 'todo-app-87775',
  storageBucket: 'todo-app-87775.appspot.com',
  messagingSenderId: '815831265520',
  appId: '1:815831265520:web:631ba53c8d0ffb2ccc1235',
  measurementId: 'G-NHFT414B7F',
});

const db = firebaseApp.firestore();
export default db;
