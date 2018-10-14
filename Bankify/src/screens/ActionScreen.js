import React, { Component } from "react";
import { View } from "react-native";
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
  Button
} from "native-base";
import SaveScreen from "./SaveScreen";
import AddScreen from "./AddScreen";
import AppHeader from "../components/AppHeader";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
export default class ActionScreen extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <AppHeader hasTabs>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Saving Money</Title>
            </Body>
          </AppHeader>
          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Text>Create</Text>
                </TabHeading>
              }
            >
              <AddScreen />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Join</Text>
                </TabHeading>
              }
            >
              <SaveScreen />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
