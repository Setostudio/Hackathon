import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Left,
  Right,
  Body,
  Title,
  Icon,
  Form,
  Input,
  Item,
  Button
} from "native-base";
import AppHeader from "../components/AppHeader";
export default class ManageScreen extends Component {
  render() {
    return (
      <View>
        <AppHeader>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Item rounded>
              <Input placeholder="" />
            </Item>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Icon name="heart" />
            </Button>
          </Right>
        </AppHeader>
        <Text>Hi</Text>
      </View>
    );
  }
}
