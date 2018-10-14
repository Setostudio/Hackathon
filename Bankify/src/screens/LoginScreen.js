import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  View,
  Input,
  Item,
  Form,
  Spinner
} from "native-base";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image,
  Dimensions
} from "react-native";
import firebaseApp from "../components/FirebaseConfig";
import AppHeader from "../components/AppHeader";
import axios from "axios";

const ENDPOINT = "http://159.65.12.44:8080";
const API_ROUTE = "/api/v3";
const AUTH_ROUTE = "/auth/v3";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    this.state = {
      userEmail: "",
      userPassword: "",
      userName: "",
      isLoading: false,
      isLoggedIn: false,
      error: "Authenication failed!"
    };
  }

  onLogin = async (username, password) => {
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
    this.setState({ isLoading: true });
    let urlApi = `${ENDPOINT}${AUTH_ROUTE}/authenticate`;
    axios
      .post(urlApi, {
        username: username,
        password: password,
        policiesAccepted: true
      })
      .then(async res => {
        this.setState({ isLoading: false });
        await AsyncStorage.setItem("token", res.data.token);
        this.props.navigation.navigate("Inner", {
          token: res.data.token,
          refToken: res.data.refreshToken,
          username: username
        });
      })
      .catch(error => {
        Alert.alert("Hi");
      });
  };
  loginUI = () => {
    if (!this.state.isLoading) {
      return (
        <Button
          rounded
          block
          style={styles.button}
          onPress={() =>
            this.onLogin(this.state.userName, this.state.userPassword)
          }
        >
          <Text style={styles.btnText}>LOGIN</Text>
        </Button>
      );
    } else {
      return <Spinner color="red" />;
    }
  };

  async componentWillMount() {
    let currentToken = await AsyncStorage.getItem("token");
    if (currentToken) {
      this.props.navigation.navigate("Inner");
    }
  }
  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Item rounded bordered style={styles.inner}>
              <Input
                placeholder="Username"
                onChangeText={value => {
                  this.setState({ userName: value });
                }}
              />
            </Item>
            <Item rounded bordered style={styles.inner}>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={value => {
                  this.setState({ userPassword: value });
                }}
              />
            </Item>
            <this.loginUI />
            <View style={styles.signUp}>
              <View>
                <Text style={styles.desText}> Don't have an account? </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text style={styles.signUpText}> Sign Up now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#19a1fa"
  },
  btnText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Roboto_medium"
  },
  signUp: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20
  },
  desText: {
    fontSize: 18,
    color: "black"
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  }
});
