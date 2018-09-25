import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import ChatList from "../containers/chatList";
import Icon from "react-native-vector-icons/Ionicons";
import SwitchButton from "../containers/switchButton";
import { connect } from "react-redux";
import { actions } from "../store/actions/accountMode";
class Chats extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: "Чаты",
         headerBackTitle: "Назад",
         headerRight: (
            <TouchableOpacity
               style={styles.searchIcon}
               onPress={() => navigation.navigate("Search")}
            >
               <Icon name="ios-search" size={25} color="#2f95dc" />
            </TouchableOpacity>
         ),
         headerLeft: <SwitchButton navigation={navigation} />
      };
   };
   render() {
      console.log(this.props.mode);
      return (
         <View style={styles.container}>
            <ChatList
               mode={this.props.mode}
               navigation={this.props.navigation}
            />
         </View>
      );
   }
}
export default connect(
   state => ({
      mode: state.accountMode.mode
   }),
   undefined
)(Chats);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff"
   },
   searchIcon: {
      paddingRight: 15,
      padding: 7
   },
   switch: {
      paddingLeft: 15,
      padding: 7
   }
});
