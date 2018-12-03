import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/innerTab/HomeScreen";
import NotificationScreen from "../screens/innerTab/NotificationScreen";
import SettingsScreen from "../screens/innerTab/SettingsScreen";
import LoginScreen from "../screens/authenication/LoginScreen";
import RegisterScreen from "../screens/authenication/RegisterScreen";

import { navigatorColor, navigatorSize } from "./NavigatorStyles";
import StatusScreen from "../screens/innerTab/StatusScreen";
import ScanScreen from "../screens/innerTab/ScanScreen";
import InfoScreen from "../screens/productView/InfoScreen";
import CartScreen from "../screens/productView/CartScreen";
const InnerStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Notification: NotificationScreen,
    Scan: ScanScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName == "Notification") {
          iconName = "ios-flame";
        } else if (routeName === "Settings") {
          iconName = `ios-person`;
        } else if (routeName == "Scan") {
          iconName = "ios-qr-scanner";
        }
        return (
          <Ionicons
            name={iconName}
            size={
              focused ? navigatorSize.focusedSize : navigatorSize.normalSize
            }
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: navigatorColor.activeTintColor,
      inactiveTintColor: navigatorColor.inactiveTintColor,
      style: {
        backgroundColor: navigatorColor.tabBackgroundColor
      }
    }
  }
);

export default (AccountStack = createAppContainer(
  createStackNavigator(
    {
      Login: LoginScreen,
      Register: RegisterScreen,
      InnerTab: InnerStack,
      Home: HomeScreen,
      Info: InfoScreen,
      Cart: CartScreen
    },
    { initialRouteName: "Login", headerMode: "none" }
  )
));
