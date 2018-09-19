import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import ChatList from "../containers/chatList";
export default class Chats extends Component {
   render() {
      return (
         <View style={styles.container}>
            <ChatList navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff"
   }
});
