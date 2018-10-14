import React, { Component } from "react";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB2_xkJ8-FdNhJZW-q4sN2-t1qBOHGRy9c",
  authDomain: "bankify-a4f8f.firebaseapp.com",
  databaseURL: "https://bankify-a4f8f.firebaseio.com",
  projectId: "bankify-a4f8f",
  storageBucket: "bankify-a4f8f.appspot.com",
  messagingSenderId: "738795337971"
};
export default (firebaseApp = firebase.initializeApp(config));
