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
  Dimensions,
  Alert
} from "react-native";

import { loginStyles } from "./AuthenicationStyles";

import FirebaseAuth from "../../components/firebase/services/FirebaseAuth";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  onLogin = async () => {
    let { email, password } = this.state;

    this.setState({ isLoading: true });

    let firebaseUtil = await FirebaseAuth._onSignin(
      email,
      password,
      this.props
    ).then(() => {
      this.setState({ isLoading: false });
    });
  };

  signinButton = () => {
    if (!this.state.isLoading) {
      return (
        <Button rounded block style={loginStyles.button} onPress={this.onLogin}>
          <Text style={loginStyles.btnText}>LOGIN</Text>
        </Button>
      );
    } else {
      return <Spinner color="red" size="large" />;
    }
  };

  componentWillMount() {
    FirebaseAuth._checkUserStatus(this.props);
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 3 }}>
          <Item rounded style={loginStyles.inner}>
            <Input
              placeholder="Email"
              onChangeText={value => {
                this.setState({ email: value });
              }}
            />
          </Item>
          <Item rounded style={loginStyles.inner}>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={value => {
                this.setState({ password: value });
              }}
            />
          </Item>
          <this.signinButton />
          <View style={loginStyles.signUp}>
            <View>
              <Text style={loginStyles.desText}> Don't have an account? </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              <Text style={loginStyles.signUpText}> Sign Up now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}
