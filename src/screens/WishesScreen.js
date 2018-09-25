import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import WishList from "../containers/wishList";
export default class Wishes extends Component {
   static navigationOptions = ({ navigation }) => ({
      title: "Поможете?"
   });
   render() {
      return (
         <View style={styles.container}>
            <WishList navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center"
   }
});
