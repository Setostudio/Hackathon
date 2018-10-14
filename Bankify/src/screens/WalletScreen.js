import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from "react-native";
import {
  Right,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  Button,
  StyleProvider
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import PieChart from "react-native-pie-chart";
import axios from "axios";
import firebaseApp from "../components/FirebaseConfig";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

const ENDPOINT = "http://159.65.12.44:8080";
const API_ROUTE = "/api/v3";
const AUTH_ROUTE = "/auth/v3";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class WalletScreen extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    this.state = {
      currentUser: "",
      currentToken: "",
      totalBudgetSpent: 0,
      series: [12500, 2000],
      sliceColor: ["#19a1fa", "#51deed"]
    };
    url =
      "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-9/43286578_1889696201149082_4073007818548969472_n.jpg?_nc_cat=106&oh=5ea2bae7c58ab3b8287a6e96261a86f5&oe=5C490F88";
    name = "";
    id = "";
    token = this.props.navigation.getParam("token");
    refToken = this.props.navigation.getParam("refToken");
    firebaseRef = firebaseApp.database().ref("goals");
  }

  onNoti = () => {
    this.props.navigation.navigate("Noti");
  };

  getInfo = () => {
    let urlApi = `${ENDPOINT}${API_ROUTE}/persons/me`;
    axios
      .get(urlApi, {
        headers: { Authorization: `bearer ${this.state.token}` }
      })
      .then(res => {
        id = res.data.id;
      })
      .catch(err => {
        console.log(err);
      });
  };
  onRefresh = async () => {
    let urlApi = `${ENDPOINT}${AUTH_ROUTE}/refresh`;

    axios
      .post(urlApi, {
        token: refToken,
        policiesAccepted: true
      })
      .then(res => {
        this.setState({ currentToken: res.data.token });
        console.log(this.state.currentToken);
      })
      .catch(err => {
        console.log(err);
      });
  };
  async componentWillMount() {
    console.log("Hi");
    await firebaseRef.on("value", snapshot => {
      let summing = 0;
      snapshot.forEach(child => {
        summing = summing + parseInt(child.val().amount);
      });
      this.setState({ totalBudgetSpent: summing });
    });
    token = await AsyncStorage.getItem("token");
    name = await AsyncStorage.getItem("username");
    if (name) {
      this.setState({ currentUser: name });
    } else {
      this.setState({ currentUser: "Hai Ngo" });
    }
    await AsyncStorage.setItem("id", id);
  }
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <ScrollView style={{ backgroundColor: "#f3f7f8" }}>
          <View style={{ flex: 1, backgroundColor: "#f3f7f8" }}>
            <ImageBackground
              source={require("../Icon/bg.png")}
              style={{
                width: "100%",
                height: 200
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginRight: 30,
                  marginTop: 30
                }}
              >
                <Icon
                  name="bell"
                  color="white"
                  size={24}
                  onPress={() => {
                    this.onNoti();
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  marginLeft: 30,
                  flexDirection: "row"
                }}
              >
                <Thumbnail source={{ uri: url }} large />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: "white" }}>
                    {this.state.currentUser}
                  </Text>
                  <Text
                    style={{ color: "white", fontFamily: "Nunito-Regular" }}
                  >
                    Total Amount
                  </Text>
                  <Text
                    style={{ fontSize: 24, color: "white", fontWeight: "bold" }}
                  >
                    $ {this.state.totalBudgetSpent}
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <View style={{ flex: 4, margin: 20 }}>
              <Card>
                <CardItem header>
                  <Text>BALANCE</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ flex: 1, alignItems: "center" }}>
                    <View>
                      <PieChart
                        chart_wh={150}
                        series={this.state.series}
                        sliceColor={this.state.sliceColor}
                      />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "column" }}>
                          <Text>Available Balance</Text>
                          <Text style={{ color: "#19a1fa" }}>$12500</Text>
                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>Frozen Balance</Text>
                        <Text style={{ color: "#51deed" }}>$2000</Text>
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </View>
          </View>
        </ScrollView>
      </StyleProvider>
    );
  }
}
