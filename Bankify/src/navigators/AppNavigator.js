import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import NotificationScreen from "../screens/NotificationScreen";
import SafeboxScreen from "../screens/SafeboxScreen";
import ManageScreen from "../screens/ManageScreen";
import WalletScreen from "../screens/WalletScreen";
import AddScreen from "../screens/AddScreen";
import { Button } from "native-base";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MessScreen from "../screens/MessScreen";
import ActionScreen from "../screens/ActionScreen";
import HistoryScreen from "../screens/HistoryScreen";

const InnerStack = createBottomTabNavigator(
  {
    Wallet: {
      screen: WalletScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="wallet" color={tintColor} size={30} />
        )
      })
    },
    Safebox: {
      screen: SafeboxScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="money" color={tintColor} size={30} />
        )
      })
    },
    Add: {
      screen: ActionScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../Icon/Button/Saving.png")}
            style={{ width: 30, height: 30 }}
          />
        )
      })
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" color={tintColor} size={30} />
        )
      })
    },
    Manage: {
      screen: ManageScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bar-chart-o" color={tintColor} size={30} />
        )
      })
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: true,
      activeBackgroundColor: "19a1fa",
      inactiveTintColor: "#cfd3d3",
      style: {
        backgroundColor: "#ffffff"
      },
      tabStyle: {}
    }
  }
);

const OutterStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Inner: {
      screen: InnerStack
    },
    Noti: {
      screen: NotificationScreen
    },
    Mess: {
      screen: MessScreen
    }
  },
  {
    headerMode: "none"
  }
);
export default OutterStack;
