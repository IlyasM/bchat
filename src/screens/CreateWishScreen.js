import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
export default class CreateWish extends Component {
   static navigationOptions = ({ navigation }) => {
      return { title: navigation.getParam("category") };
   };
   render() {
      return <View style={styles.container} />;
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   }
});
