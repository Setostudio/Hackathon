import React, { Component } from "react";
import { View, Text, Alert } from "react-native";

import FirebaseApp from "../config/FirebaseInit";
class FirebaseAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onTest = () => {
    Alert.alert("Test");
  };
  _onSignin = (email, password, newProps) => {
    FirebaseApp.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        newProps.navigation.navigate("InnerTab");
      })
      .catch(err => {
        console.log(err);
      });
  };
  _checkUserStatus = newProps => {
    FirebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        newProps.navigation.navigate("InnerTab");
      }
    });
  };
  _checkUserProfile = () => {
    let authenData = FirebaseApp.auth().currentUser;
    return {
      name: authenData.displayName,
      email: authenData.email,
      uid: authenData.uid,
      photoUrl: authenData.photoUrl
    };
  };
}

export default new FirebaseAuth();
