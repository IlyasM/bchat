import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { actions } from "../store/actions/accountMode";
class Switch extends Component {
   render() {
      return (
         <TouchableOpacity
            style={{
               paddingLeft: 15,
               padding: 7
            }}
            onPress={() => {
               const text =
                  this.props.mode === "Business" ? "Main" : "Business";
               this.props.toggle(text);
               this.props.navigation.navigate(text);
            }}
         >
            <Icon name="ios-switch" size={25} color="#2f95dc" />
         </TouchableOpacity>
      );
   }
}

export default connect(
   state => ({
      mode: state.accountMode.mode
   }),
   { toggle: actions.toggle }
)(Switch);
