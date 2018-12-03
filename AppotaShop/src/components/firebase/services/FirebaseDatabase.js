import React, { Component } from "react";
import { View, Text } from "react-native";

import FirebaseApp from "../config/FirebaseInit";
class FirebaseDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _fetchAllProduct = async () => {
    let items = [];

    FirebaseApp.database()
      .ref("newProduct")
      .once("value", snapShot => {
        snapShot.forEach(child => {
          items.push(child.val());
        });
      })
      .then(() => {
        return items;
      });
  };
}

export default new FirebaseDatabase();
