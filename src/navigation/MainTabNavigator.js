import React from "react";
import { Platform, Dimensions } from "react-native";
import {
   createStackNavigator,
   createBottomTabNavigator,
   createDrawerNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import ProfileScreen from "../screens/ProfileScreen";

import WishesScreen from "../screens/WishesScreen";
import ChatsScreen from "../screens/ChatsScreen";
import CreateScreen from "../screens/CreateScreen";
import SearchScreen from "../screens/SearchScreen";
import MessagesScreen from "../screens/MessagesScreen";
import CreateWishScreen from "../screens/CreateWishScreen";

import BusinessProfileScreen from "../screens/BusinessProfileScreen";
import PhotoViewerScreen from "../screens/PhotoViewerScreen";

const WIDTH = Dimensions.get("window").width;
const HomeStack = createStackNavigator({
   Home: PhotoViewerScreen,
   Chat: MessagesScreen
});

HomeStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Home",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-home${focused ? "" : "-outline"}`
               : "md-information-circle"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 0 ? false : true
});

// const WishesStack = createStackNavigator({
//    Wishes: WishesScreen
// });

// WishesStack.navigationOptions = {
//    tabBarLabel: "Wishes",
//    tabBarIcon: ({ focused }) => (
//       <TabBarIcon
//          focused={focused}
//          name={
//             Platform.OS === "ios"
//                ? `ios-list-box${focused ? "" : "-outline"}`
//                : "md-link"
//          }
//       />
//    )
// };
// const WithProfile = createDrawerNavigator(
//    {
//       FinalStack
//    },
//    {
//       contentComponent: MessagesScreen,
//       drawerPosition: "right",
//       drawerWidth: WIDTH - 48
//    }
// );
// const DrawMessage = createDrawerNavigator(
//    { MessagesScreen },
//    {
//       contentComponent: ProfileScreen,
//       drawerPosition: "right",
//       drawerWidth: WIDTH - 48
//    }
// );
// DrawMessage.navigationOptions = ({ navigation }) => {
//    return {
//       title: navigation.getParam("name")
//    };
// };

const CreateStack = createStackNavigator({
   Create: CreateScreen,
   CreateWish: CreateWishScreen,
   Chat: MessagesScreen,
   Profile: ProfileScreen,
   BusinessProfile: BusinessProfileScreen
});

CreateStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Найти",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-search${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 1 ? false : true
});

const ChatsStack = createStackNavigator({
   Chats: ChatsScreen,
   Chat: MessagesScreen,
   Profile: ProfileScreen,
   BusinessProfile: BusinessProfileScreen
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
const RequestStack = createStackNavigator({
   Request: RequestScreen,
   Chat: MessagesScreen,
   Profile: ProfileScreen,
   BusinessProfile: BusinessProfileScreen
});

RequestStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Мои запросы",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-list-box${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 0 ? false : true
});

const Tabs = createBottomTabNavigator(
   {
      HomeStack,
      // WishesStack,
      CreateStack,
      ChatsStack,
      RequestStack
   },
   { initialRouteName: "HomeStack" }
);

const FinalStack = createStackNavigator(
   {
      Tabs: Tabs,
      MSN: MessagesScreen,
      Search: SearchScreen
   },
   {
      mode: "modal",
      headerMode: "none"
   }
);

export default FinalStack;
