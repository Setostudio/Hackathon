import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

import FirebaseAuth from "../../components/firebase/services/FirebaseAuth";

import AppHeader from "../../components/appInterface/AppHeader";
class SettingScreen extends Component {
  constructor(props) {
    super(props);
    let { name, email, uid, photoUrl } = FirebaseAuth._checkUserProfile();

    if (photoUrl == undefined || photoUrl == null) {
      photoUrl =
        "http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    }
    this.state = {
      userName: name,
      userEmail: email,
      userUid: uid,
      userPhotoUrl: photoUrl,
      isShowPassword: false
    };
  }

  render() {
    let {
      userName,
      userEmail,
      userUid,
      userPhotoUrl,
      isShowPassword
    } = this.state;

    return (
      <Container>
        <AppHeader />
        <Content>
          <ListItem itemDivider>
            <Text>Profile</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Ionicons name="ios-contact" size={30} color="#1976d2" />
            </Left>
            <Body>
              <Text>Username:</Text>
            </Body>
            <Right>
              <Text style={{ color: "#1976d2" }}>{userName}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Ionicons name="ios-mail" size={30} color="#1976d2" />
            </Left>
            <Body>
              <Text>Email:</Text>
            </Body>
            <Right>
              <Text style={{ color: "#1976d2" }}>{userEmail}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Ionicons name="ios-key" size={30} color="#1976d2" />
            </Left>
            <Body>
              <Text>Password:</Text>
            </Body>
            <Right>
              <Text style={{ color: "#1976d2" }}>*********</Text>
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>Contacts</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
                <Ionicons name="ios-people" size={30} color="#1976d2" />
              </Button>
            </Left>
            <Body>
              <Text>Contact</Text>
            </Body>
            <Right>
              <Button transparent>
                <Ionicons name="ios-arrow-forward" size={30} color="#1976d2" />
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
                <Ionicons name="ios-pulse" size={30} color="#1976d2" />
              </Button>
            </Left>
            <Body>
              <Text>Stats: </Text>
            </Body>
            <Right>
              <Button transparent>
                <Ionicons name="ios-arrow-forward" size={30} color="#1976d2" />
              </Button>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  infoText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold"
  },
  deepInfo: {
    flex: 4,
    alignItems: "flex-end"
  },
  headerText: {
    fontSize: 18,
    color: "#f4653b"
  },
  button: {
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    backgroundColor: "#f4653b"
  },
  btnText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Roboto_medium"
  }
});

export default SettingScreen;
