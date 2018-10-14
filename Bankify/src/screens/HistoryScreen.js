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
import AllScreen from "./AllScreen";
import TopupScreen from "./TopupScreen";
import WithdrawScreen from "./WithdrawScreen";
import AppHeader from "../components/AppHeader";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
export default class HistoryScreen extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <AppHeader hasTabs>
            <Body style={{ alignItems: "center" }}>
              <Title>Saving Money</Title>
            </Body>
          </AppHeader>
          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Text>All</Text>
                </TabHeading>
              }
            >
              <AllScreen />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Topup</Text>
                </TabHeading>
              }
            >
              <TopupScreen />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Withdraw</Text>
                </TabHeading>
              }
            >
              <WithdrawScreen />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
