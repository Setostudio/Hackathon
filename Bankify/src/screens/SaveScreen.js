import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Picker,
  Form,
  Input,
  Item,
  List,
  ListItem
} from "native-base";
import AppHeader from "../components/AppHeader";
import firebaseApp from "../components/FirebaseConfig";
export default class SaveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      dataList: [],
      criteriaAmount: [],
      criteriaSize: [],
      currentUser: "",
      amount: "",
      size: ""
    };
    name = "";
    firebaseRef = firebaseApp.database().ref(`goals`);
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
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
      let items = [];
      let itemsSize = [];
      let itemsAmount = [];
      snapshot.forEach(child => {
        let joined = false;
        console.log(child.val().participants);
        // child.val().participants.forEach(key => {
        //   if (key.name == this.state.currentUser) {
        //     joined = true;
        //   } else {
        //     joined = false;
        //   }
        // });
        items.push({
          id: child.val().id,
          amount: child.val().amount,
          answer: child.val().answer,
          date: child.val().date,
          month: months[child.val().month],
          eventName: child.val().eventName,
          number: child.val().number,
          currentNumber: Object.keys(child.val().participants).length,
          participant: child.val().participants,
          status: joined
        });

        itemsSize.push(child.val().number);
        console.log(itemsSize);
        itemsAmount.push(child.val().amount);
        console.log(itemsAmount);
      });
      this.setState({
        dataList: items,
        criteriaAmount: itemsAmount,
        criteriaSize: itemsSize
      });
    });
  };
  onSearch = () => {
    if (this.state.criteriaAmount == "" && this.state.criteriaSize == "") {
      return;
    }
    let array = [];
    for (i = 0; i <= this.state.criteriaAmount; i++) {
      if (this.state.criteriaAmount[i] <= this.state.amount) {
        array.push(this.state.criteriaAmount[i]);
      }
    }
    this.setState({ dataList: array });
  };
  async componentWillMount() {
    name = await AsyncStorage.getItem("username");
    this.onRefresh();
    if (name) {
      this.setState({ currentUser: name });
    } else {
      this.setState({ currentUser: "Hai Ngo" });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#ececec", flex: 1 }}>
        <ScrollView>
          <AppHeader style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column"
              }}
            >
              <Text>Amount</Text>
              <Item>
                <Input
                  placeholder="Amount"
                  onChangeText={value => {
                    this.setState({ amount: value });
                  }}
                />
              </Item>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.onSearch();
                }}
              >
                <Image
                  source={require("../Icon/Currency.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Daily" value="key0" />
                  <Picker.Item label="Weekly" value="key1" />
                  <Picker.Item label="Monthly" value="key2" />
                </Picker>
              </Form>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>Group size</Text>
              <Item>
                <Input
                  placeholder="Friends"
                  onChangeText={value => {
                    this.setState({ size: value });
                  }}
                />
              </Item>
            </View>
          </AppHeader>
          <List
            dataArray={this.state.dataList}
            renderRow={item => (
              <View
                style={{
                  flex: 1,
                  margin: 15,
                  borderWidth: 0.5,
                  borderColor: "#ffffff",
                  backgroundColor: "#ffffff"
                }}
              >
                <ListItem style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.headingDate}>{item.date}</Text>
                    <Text style={styles.subDate}>{item.month}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.subFont}>{item.eventName}</Text>
                    <Text style={styles.subFont}>Amount</Text>
                    <Text style={styles.headingFont}>{item.amount}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.subFont}>Cycle</Text>
                    <Text style={styles.headingFont}>{item.answer}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.subFont}>Group Size</Text>
                    <Text style={styles.headingFont}>
                      {item.currentNumber} / {item.number}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={
                          item.status
                            ? {
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#19a5f7"
                              }
                            : {
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#00000"
                              }
                        }
                      >
                        {item.status ? "Joined" : "Join"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ListItem>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingFont: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subFont: {
    fontSize: 14,
    color: "#6D6875"
  },
  headingDate: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#19a5f7"
  },
  subDate: {
    fontSize: 18,
    color: "#19a5f7"
  }
});
