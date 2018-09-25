import React from "react";
import { Platform } from "react-native";
import {
   createStackNavigator,
   createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import WishesScreen from "../screens/WishesScreen";
import ProfileScreen from "../screens/RequestScreen";
import ChatsScreen from "../screens/ChatsScreen";
import SearchScreen from "../screens/SearchScreen";
import MessagesScreen from "../screens/MessagesScreen";
import EditReplyScreen from "../screens/EditReplyScreen";
const WishesStack = createStackNavigator({
   Wishes: WishesScreen,
   Chat: MessagesScreen
});

WishesStack.navigationOptions = ({ navigation }) => ({
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
      WishesStack,
      ChatsStack,
      SettingsStack
   },
   { initialRouteName: "WishesStack" }
);

export default createStackNavigator(
   {
      Tabs: Tabs,
      EditReply: EditReplyScreen
   },
   {
      mode: "modal",
      headerMode: "none"
   }
);
