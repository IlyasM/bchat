import React, { PureComponent } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
export default class hello extends PureComponent {
   render() {
      return (
         <Icon
            style={{ margin: 8, marginLeft: 10 }}
            color={Colors.tintColor}
            name="ios-arrow-back"
            size={28}
         />
      );
   }
}
