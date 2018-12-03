import React, { Component } from "react";
import { View } from "react-native";

import AppHeader from "../../components/appInterface/AppHeader";
import FirebaseApp from "../../components/firebase/config/FirebaseInit";
import FirebaseAuth from "../../components/firebase/services/FirebaseAuth";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNotification: []
    };
  }

  onLoadNotification = () => {
    let { uid } = FirebaseAuth._checkUserProfile();
    FirebaseApp.database()
      .ref(`users/${uid}/property`)
      .once("value")
      .then(snapShot => {
        let items = [];
        snapShot.forEach(child => {
          items.push(child.val());
        });
        this.setState({ listNotification: items });
      });
  };
  componentWillMount() {
    this.onLoadNotification();
  }
  render() {
    return (
      <View>
        <AppHeader />

        <List
          dataArray={this.state.listNotification}
          renderRow={item => (
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: item.imgUrl }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note>
                  You purchased: {item.number} at the cost of {item.productSum}
                </Text>
              </Body>
              <Right>
                <Text note>{item.time}</Text>
              </Right>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

export default NotificationScreen;
