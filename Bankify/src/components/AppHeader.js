import React, { Component } from "react";
import {
  StyleProvider,
  Header,
  Left,
  Right,
  Body,
  Text,
  Title,
  Icon,
  Button
} from "native-base";
import { TouchableOpacity } from "react-native";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
export default class AppHeader extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Header>{this.props.children}</Header>
      </StyleProvider>
    );
  }
}
