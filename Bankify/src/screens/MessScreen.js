import React, { Component } from "react";
import { Text, ImageBackground, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Left, Button, Right, Body, Icon, Title } from "native-base";
import AppHeader from "../components/AppHeader";
import firebaseApp from "../components/FirebaseConfig";
export default class MessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: ""
    };

    groupId = this.props.navigation.getParam("id");

    messRef = firebaseApp.database().ref(`messages/${groupId}`);
  }

  listenForMessages = chatRef => {
    chatRef.on("value", snapShot => {
      var items = [];
      snapShot.forEach(child => {
        items.unshift({
          _id: child.key,
          createdAt: child.val().createdAt,
          text: child.val().text,
          user: {
            _id: child.val().uid
          }
        });
      });

      this.setState({ messages: items });
    });
  };
  onSend(messages = []) {
    messages.forEach(message => {
      var now = new Date().getTime();
      messRef.push().set({
        text: message.text,
        createdAt: now,
        uid: this.state.currentUser,
        order: -1 * now
      });
    });
  }
  onBack = () => {
    this.props.navigation.goBack();
  };

  async componentWillMount() {
    this.listenForMessages(messRef.limitToLast(20));
    name = await AsyncStorage.getItem("username");
    if (name) {
      this.setState({ currentUser: name });
    } else {
      this.setState({ currentUser: "Hai Ngo" });
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                color="#FFFBBD"
                onPress={() => {
                  this.onBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#fafafa" }}>{name}</Title>
          </Body>
        </AppHeader>

        <GiftedChat
          showUserAvatar={true}
          messages={this.state.messages}
          onSend={messages => {
            this.onSend(messages);
          }}
          user={{
            _id: this.state.currentUser
          }}
        />
      </View>
    );
  }
}
