import React from "react";
import { Platform, TouchableOpacity } from "react-native";
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
import BusinessProfileScreen from "../screens/BusinessProfileScreen";
import PhotoViewerScreen from "../screens/PhotoViewerScreen";
import MapScreen from "../screens/MapScreen";
import BusinessSettingsScreen from "../screens/BusinessSettingsScreen";
const WishesStack = createStackNavigator({
   Wishes: WishesScreen
   // Chat: MessagesScreen
});

WishesScreen.navigationOptions = ({ navigation }) => ({
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
   Chats: ChatsScreen
   // Chat: MessagesScreen
});

ChatsScreen.navigationOptions = ({ navigation }) => ({
   title: "Чаты",
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
const SettingsStack = createStackNavigator(
   {
      BusinessSettings: BusinessSettingsScreen,
      Map: MapScreen
   },
   { headerMode: "none" }
);

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
      "Люди спрашивают": WishesScreen,
      Чаты: ChatsScreen,
      SettingsStack
   },
   { initialRouteName: "SettingsStack" }
);

import SearchIcon from "../components/searchIcon";
import SwitchButton from "../containers/switchButton";
Tabs.navigationOptions = ({ navigation }) => {
   const { routeName } = navigation.state.routes[navigation.state.index];

   // You can do whatever you like here to pick the title based on the route name
   const headerTitle = routeName;
   const headerBackTitle = "Назад";
   let headerRight, headerLeft;
   switch (routeName) {
      case "Чаты":
         headerRight = <SearchIcon navigation={navigation} />;
         headerLeft = <SwitchButton navigation={navigation} />;
      case "Other":
         headerRight = <SearchIcon navigation={navigation} />;
         headerLeft = <SwitchButton navigation={navigation} />;
   }

   return {
      headerTitle,
      headerBackTitle,
      headerRight,
      headerLeft
   };
};

const withChat = createStackNavigator(
   {
      Tabs: Tabs,

      Chat: MessagesScreen
   },
   {
      // mode: "modal",
      // headerMode: "none"
   }
);
export default createStackNavigator(
   {
      WithChat: withChat,
      EditReply: EditReplyScreen,
      PhotoViewer: PhotoViewerScreen
   },
   {
      mode: "modal",
      headerMode: "none"
   }
);
