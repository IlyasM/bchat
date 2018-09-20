import React from "react";
import { Platform } from "react-native";
import {
   createStackNavigator,
   createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatsScreen from "../screens/ChatsScreen";
import SearchScreen from "../screens/SearchScreen";
import MessagesScreen from "../screens/MessagesScreen";
const HomeStack = createStackNavigator({
   Home: HomeScreen,
   Chat: MessagesScreen
});

HomeStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Запросы",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-notifications${focused ? "" : "-outline"}`
               : "md-information-circle"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 0 ? false : true
});

const ChatsStack = createStackNavigator({
   Chats: ChatsScreen,
   Chat: MessagesScreen
});

ChatsStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Чаты",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-chatbubbles${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 0 ? false : true
});
const SettingsStack = createStackNavigator({
   Profile: ProfileScreen,
   Chat: MessagesScreen
});

SettingsStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Настройки",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-settings${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 0 ? false : true
});

const Tabs = createBottomTabNavigator(
   {
      HomeStack,
      ChatsStack,
      SettingsStack
   },
   { initialRouteName: "SettingsStack" }
);

export default createStackNavigator(
   {
      Tabs: Tabs,
      Search: SearchScreen
   },
   {
      mode: "modal",
      headerMode: "none"
   }
);
