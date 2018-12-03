import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  Container,
  Content,
  Button,
  Input,
  Item,
  Form,
  Spinner
} from "native-base";

import { registerStyles } from "./AuthenicationStyles";
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    };
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#26A69A" }} />
          <View style={{ flex: 4 }}>
            <Item rounded bordered style={registerStyles.inner}>
              <Input
                placeholder="Email"
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />
            </Item>
            <Item rounded bordered style={registerStyles.inner}>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => {
                  this.setState({ password: value });
                }}
              />
            </Item>
            <Item rounded bordered style={registerStyles.inner}>
              <Input
                secureTextEntry={true}
                placeholder="Confirm Password"
                onChangeText={value => {
                  this.setState({ confirmPassword: value });
                }}
              />
            </Item>
            <Item rounded bordered style={registerStyles.inner}>
              <Input
                placeholder="Username"
                onChangeText={value => {
                  this.setState({ username: value });
                }}
              />
            </Item>
            <Button rounded block style={registerStyles.button}>
              <Text
                style={registerStyles.btnText}
                onPress={() => {
                  this.onSignUp();
                }}
              >
                SIGN UP
              </Text>
            </Button>
            <View style={registerStyles.signUp}>
              <View>
                <Text style={registerStyles.desText}>
                  {" "}
                  Already have an account?{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text style={registerStyles.signUpText}> Sign in now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
