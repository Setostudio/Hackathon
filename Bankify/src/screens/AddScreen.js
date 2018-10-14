import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import {
  Content,
  Item,
  Input,
  Icon,
  Radio,
  Right,
  Body,
  Left,
  Picker,
  Form,
  Button,
  Text
} from "native-base";
import AppHeader from "../components/AppHeader";
import firebaseApp from "../components/FirebaseConfig";

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCoSaving: false,
      selected: "key0",
      amount: "",
      groupNumber: 0,
      currentUser: "",
      currentId: "",
      eventName: ""
    };
    name = "";
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  groupSelection = () => {
    if (!this.state.isCoSaving) {
      return <View />;
    } else {
      return (
        <View>
          <Item>
            <Input
              placeholder="Group Size"
              onChangeText={value => {
                this.setState({ groupNumber: value });
              }}
            />
          </Item>
        </View>
      );
    }
  };

  onSubmit = () => {
    let answer = "";
    if (this.state.selected == "key1") {
      answer = "Daily";
    } else if (this.state.selected == "key2") {
      answer = "Weekly";
    } else {
      answer = "Month";
    }
    let randomId = parseInt(Math.random() * 10000);
    let today = new Date().getDate();
    let month = new Date().getMonth();
    firebaseApp
      .database()
      .ref(`goals`)
      .push()
      .set({
        id: randomId,
        answer: answer,
        amount: this.state.amount,
        number: this.state.groupNumber,
        date: today,
        month: month,
        eventName: this.state.eventName,
        participants: [
          {
            id: this.state.currentId,
            name: this.state.currentUser
          }
        ]
      });
  };

  async componentWillMount() {
    name = await AsyncStorage.getItem("username");
    if (name) {
      this.setState({ currentUser: name });
    } else {
      this.setState({ currentUser: "Hai Ngo" });
    }
    id = await AsyncStorage.getItem("id");
    if (id) {
      this.setState({ currentId: id });
    } else {
      this.setState({ currentId: "Hai Ngo" });
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../Icon/img_saving.png")}
            style={{
              width: "80%",
              height: 200
            }}
          />
        </View>
        <View>
          <Item>
            <Input
              placeholder="Amount"
              onChangeText={value => {
                this.setState({ amount: value });
              }}
            />
            <Image
              source={require("../Icon/Currency.png")}
              style={{
                width: 40,
                height: 40
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Name"
              onChangeText={value => {
                this.setState({ eventName: value });
              }}
            />
          </Item>
          <Form>
            <Picker
              renderHeader={backAction => (
                <Header style={{ backgroundColor: "#f44242" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>Your Header</Title>
                  </Body>
                  <Right />
                </Header>
              )}
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Cycle" value="key0" />
              <Picker.Item label="Daily" value="key1" />
              <Picker.Item label="Weekly" value="key2" />
              <Picker.Item label="Monthly" value="key3" />
            </Picker>
          </Form>
          <Item>
            <Input placeholder="Co-saving" disabled={true} />
            <Radio
              selected={this.state.isCoSaving}
              style={{ marginRight: 10 }}
              onPress={() => {
                if (!this.state.isCoSaving) {
                  this.setState({ isCoSaving: true });
                } else {
                  this.setState({ isCoSaving: false });
                }
              }}
            />
          </Item>
          <this.groupSelection />
          <View style={{ marginTop: 30 }}>
            <Button
              rounded
              block
              style={{
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: "#18a8f7"
              }}
              onPress={() => {
                this.onSubmit();
              }}
            >
              <Text>Saving!</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
