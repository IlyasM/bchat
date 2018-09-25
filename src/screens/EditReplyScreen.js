import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import EditReply from "../components/editReply.js";
export default class Screen extends Component {
   render() {
      return (
         <View style={styles.container}>
            <EditReply navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   }
});
