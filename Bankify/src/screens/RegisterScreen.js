import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  View,
  Input,
  Item,
  Form
} from "native-base";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import firebaseApp from "../components/FirebaseConfig";
import AppHeader from "../components/AppHeader";

const ENDPOINT = "http://159.65.12.44:8080";
const API_ROUTE = "/api/v3";
const AUTH_ROUTE = "/auth/v3";
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      userRePassword: "",
      userName: "",
      name: "",
      isloading: false,
      error: "Sign up failed !"
    };
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }
  onRegister = async () => {
    await AsyncStorage.setItem("user", this.state.userName);
    this.setState({ isloading: true });
    if (this.state.userPassword !== this.state.userRePassword) {
      this.setState({ error: "Wrong confirmation password" });
      Alert.alert(this.state.error);
      this.setState({ error: "Sign up failed!" });
      return;
    }
    let urlApi = `${ENDPOINT}${API_ROUTE}/persons`;
    axios
      .post(urlApi, {
        username: userName,
        name: name,
        email: email,
        password: password
      })
      .then(async res => {
        await AsyncStorage.setItem("id", res.data.id);
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#19a1fa" }} />
          <View style={{ flex: 4 }}>
            <Item rounded bordered style={styles.inner}>
              <Input
                placeholder="Email"
                onChangeText={value => {
                  this.setState({ userEmail: value });
                }}
              />
            </Item>
            <Item rounded bordered style={styles.inner}>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => {
                  this.setState({ userPassword: value });
                }}
              />
            </Item>
            <Item rounded bordered style={styles.inner}>
              <Input
                secureTextEntry={true}
                placeholder="Confirm Password"
                onChangeText={value => {
                  this.setState({ userRePassword: value });
                }}
              />
            </Item>
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
                placeholder="How can we call you?"
                onChangeText={value => {
                  this.setState({ name: value });
                }}
              />
            </Item>
            <Button
              rounded
              block
              style={styles.button}
              onPress={this.onRegister}
            >
              <Text style={styles.btnText}>SIGN UP</Text>
            </Button>
            <View style={styles.signUp}>
              <View>
                <Text style={styles.desText}> Already have an account? </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text style={styles.signUpText}> Sign in now</Text>
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
