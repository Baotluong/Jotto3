const firebase = require('firebase');
const config = require('./config');

firebase.initializeApp(config.config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

module.exports = {
  firebase,
  googleAuthProvider,
  database
};