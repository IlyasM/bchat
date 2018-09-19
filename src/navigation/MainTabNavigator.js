import React from "react";
import { Platform } from "react-native";
import {
   createStackNavigator,
   createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WishesScreen from "../screens/WishesScreen";
import ChatsScreen from "../screens/ChatsScreen";
import CreateScreen from "../screens/CreateScreen";
import SearchScreen from "../screens/SearchScreen";
import MessagesScreen from "../screens/MessagesScreen";
import CreateWishScreen from "../screens/CreateWishScreen";
// const HomeStack = createStackNavigator({
//    Home: HomeScreen,
//    Chat: MessagesScreen
// });

// HomeStack.navigationOptions = ({ navigation }) => ({
//    tabBarLabel: "Home",
//    tabBarIcon: ({ focused }) => (
//       <TabBarIcon
//          focused={focused}
//          name={
//             Platform.OS === "ios"
//                ? `ios-home${focused ? "" : "-outline"}`
//                : "md-information-circle"
//          }
//       />
//    ),
//    tabBarVisible: navigation.state.index > 0 ? false : true
// });

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

const CreateStack = createStackNavigator({
   Create: CreateScreen,
   CreateWish: CreateWishScreen,
   Chat: MessagesScreen
});

CreateStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Home",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-home${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   ),
   tabBarVisible: navigation.state.index > 1 ? false : true
});
const ChatsStack = createStackNavigator({
   Chats: ChatsScreen,
   Chat: MessagesScreen
});

ChatsStack.navigationOptions = ({ navigation }) => ({
   tabBarLabel: "Chats",
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
const ProfileStack = createStackNavigator({
   Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
   tabBarLabel: "Profile",
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={
            Platform.OS === "ios"
               ? `ios-person${focused ? "" : "-outline"}`
               : "md-options"
         }
      />
   )
};

const Tabs = createBottomTabNavigator(
   {
      // HomeStack,
      // WishesStack,
      CreateStack,
      ChatsStack,
      ProfileStack
   },
   { initialRouteName: "CreateStack" }
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
