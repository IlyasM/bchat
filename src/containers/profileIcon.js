import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { actions } from "../store/actions/accountMode";
export default class Switch extends Component {
   render() {
      return (
         <TouchableOpacity
            style={{
               paddingRight: 15,
               padding: 7
            }}
            onPress={() => {
               this.props.navigation.navigate("Profile");
            }}
         >
            <Icon name="ios-person" size={25} color="#2f95dc" />
         </TouchableOpacity>
      );
   }
}

// export default connect(
//    state => ({
//       mode: state.accountMode.mode
//    }),
//    { toggle: actions.toggle }
// )(Switch);
