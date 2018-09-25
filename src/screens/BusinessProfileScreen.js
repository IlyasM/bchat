import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import BusinessProfile from "../components/businessProfile";
import Back from "../components/backArrow";
export default class Screen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title:
            (navigation.getParam("category") &&
               navigation.getParam("category").name) ||
            "Квартиры",
         headerBackImage: <Back />
      };
   };
   render() {
      return (
         <View style={styles.container}>
            <BusinessProfile navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
});
