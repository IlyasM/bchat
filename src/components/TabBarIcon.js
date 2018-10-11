import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { TouchableOpacity, Alert } from "react-native";
import { State, LongPressGestureHandler } from "react-native-gesture-handler";

export default class TabBarIcon extends React.Component {
   _handleStateChange = ({ nativeEvent }) => {
      if (nativeEvent.state === State.ACTIVE || State.BEGAN) {
         Alert.alert("Longpress");
      }
   };
   render() {
      return (
         <LongPressGestureHandler
            onHandlerStateChange={this._handleStateChange}
         >
            <Icon
               name={this.props.name}
               size={26}
               style={{ marginBottom: -3 }}
               color={
                  this.props.focused
                     ? Colors.tabIconSelected
                     : Colors.tabIconDefault
               }
            />
         </LongPressGestureHandler>
      );
   }
}
