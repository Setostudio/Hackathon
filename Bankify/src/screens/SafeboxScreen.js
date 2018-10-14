import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  StyleProvider,
  Title,
  Left,
  Body,
  Right,
  Button,
  List,
  ListItem,
  Card,
  CardItem,
  Content
} from "native-base";
import AppHeader from "../components/AppHeader";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import firebaseApp from "../components/FirebaseConfig";
export default class SafeboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      dataList: [],
      currentUser: ""
    };
    name = "";
    firebaseRef = firebaseApp.database().ref(`goals`);
  }
  onRefresh = () => {
    firebaseRef.on("value", snapshot => {
      let months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let myItems = [];
      snapshot.forEach(child => {
        let joined = false;

        // child.val().participants.forEach(key => {
        //   if (key.name == this.state.currentUser) {
        //     joined = true;
        //   } else {
        //     joined = false;
        //   }
        // });
        myItems.push({
          id: child.val().id,
          amount: child.val().amount,
          answer: child.val().answer,
          date: child.val().date,
          month: months[child.val().month],
          nextMonth: months[child.val().month++],
          eventName: child.val().eventName,
          number: child.val().number,
          currentNumber: Object.keys(child.val().participants).length,
          participant: child.val().participants
        });
      });
      this.setState({ dataList: myItems });
    });
  };

  async componentWillMount() {
    this.onRefresh();
  }
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <View>
            <AppHeader>
              <Body style={{ flex: 1, alignItems: "center" }}>
                <Title>Save Box</Title>
              </Body>
            </AppHeader>
          </View>
          <View style={{ flex: 1 }}>
            <List
              dataArray={this.state.dataList}
              renderRow={item => (
                <ListItem>
                  <Content style={{ flex: 1 }}>
                    <Card style={{ alignItems: "center", flex: 1 }}>
                      <CardItem header bordered>
                        <View style={{ flex: 1 }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate("Mess", {
                                id: item.id
                              });
                            }}
                          >
                            <Text>Next Popup</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text>Next Withdrawal</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text>Group Size</Text>
                        </View>
                      </CardItem>
                      <CardItem bordered>
                        <Body
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text>
                              {item.date} {item.nextMonth}
                            </Text>
                            <Text>{item.amount}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text>
                              {item.date} {item.nextMonth}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text>
                              {item.currentNumber} / {item.number}
                            </Text>
                          </View>
                        </Body>
                      </CardItem>
                      <CardItem footer bordered>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text>Total Saving</Text>
                          </View>
                          <View
                            style={{
                              flex: 5,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text style={{ fontSize: 25, color: "#188bf5" }}>
                              {item.amount}
                            </Text>
                          </View>
                        </View>
                      </CardItem>
                    </Card>
                  </Content>
                </ListItem>
              )}
            />
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
//188bf5
//8e989a
