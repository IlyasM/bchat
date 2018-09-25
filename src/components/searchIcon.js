import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
export class componentName extends Component {
   render() {
      return (
         <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => this.props.navigation.navigate("Search")}
         >
            <Icon name="ios-search" size={25} color="#2f95dc" />
         </TouchableOpacity>
      );
   }
}
const styles = StyleSheet.create({
   searchIcon: {
      paddingRight: 15,
      padding: 7
   }
});

export default componentName;
