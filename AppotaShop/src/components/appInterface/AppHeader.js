import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Right,
  Item,
  Input,
  StyleProvider
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

import getTheme from "../../../native-base-theme/components";
import commonColor from "../../../native-base-theme/variables/commonColor";

const { height, width } = Dimensions.get("window");
class AppHeader extends Component {
  renderViewStyle = () => {
    switch (this.props.viewStyle) {
      case "list":
        return (
          <View>
            <Button transparent onPress={this.props.onChangeView}>
              <Ionicons name="ios-options" size={25} color="#1976d2" />
            </Button>
          </View>
        );
      case "grid":
        return (
          <View>
            <Button transparent onPress={this.props.onChangeView}>
              <Ionicons name="ios-grid" size={25} color="#1976d2" />
            </Button>
          </View>
        );
    }
  };
  render() {
    switch (this.props.headerModal) {
      case "search":
        return (
          <StyleProvider style={getTheme(commonColor)}>
            <Header>
              <Body style={{ flex: 3 }}>
                <Item regular style={{ borderRadius: 10 }}>
                  <Ionicons name="ios-search" size={25} color="#1976d2" />
                  <Input placeholder="AppotaShop" />
                </Item>
              </Body>
              <Right style={{ flex: 2 }}>
                <this.renderViewStyle />
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigationProps.navigate("Cart");
                  }}
                >
                  <Ionicons name="ios-cart" size={25} color="#1976d2" />
                </Button>
                <Button transparent>
                  <Ionicons name="ios-chatbubbles" size={25} color="#1976d2" />
                </Button>
              </Right>
            </Header>
          </StyleProvider>
        );
      default:
        return (
          <StyleProvider style={getTheme(commonColor)}>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigationProps.goBack();
                  }}
                >
                  <Ionicons name="ios-arrow-back" size={25} color="#1976d2" />
                </Button>
              </Left>
              <Body style={{ flex: 2 }}>
                <Title>AppotaShop</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigationProps.navigate("Cart");
                  }}
                >
                  <Ionicons name="ios-cart" size={25} color="#1976d2" />
                </Button>
                <Button transparent>
                  <Ionicons name="ios-chatbubbles" size={25} color="#1976d2" />
                </Button>
              </Right>
            </Header>
          </StyleProvider>
        );
    }
  }
}

const styles = StyleSheet.create({});
export default AppHeader;
