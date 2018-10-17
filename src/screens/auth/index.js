import React from "react";
import { createStackNavigator } from "react-navigation";
import EnterEmail from "./enterEmail";
import EnterCode from "./enterCode";
import EnterName from "./enterName";

export default createStackNavigator({
   EnterEmail,
   EnterCode,
   EnterName
});

// HomeStack.navigationOptions = ({ navigation }) => ({
//    tabBarLabel: "Home",
//    tabBarIcon: ({ focused }) => (
//       <TabBarIcon
//          focused={focused}
//          name={
//             Platform.OS === "ios"
//                ? `ios-home${focused ? "" : "-outline"}`
//                : "md-informa tion-circle"
//          }
//       />
//    ),
//    tabBarVisible: navigation.state.index > 0 ? false : true
// });
