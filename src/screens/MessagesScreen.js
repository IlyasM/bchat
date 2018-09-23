import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import MessageList from "../containers/messageList";
import Back from "../components/backArrow";
export default class MessagesScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: navigation.getParam("name"),
         headerBackImage: <Back />
      };
   };
   render() {
      return (
         <View style={styles.container}>
            <MessageList navigation={this.props.navigation} />
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
