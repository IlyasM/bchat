import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import BusinessEdit from "../components/businessEdit";
import Back from "../components/backArrow";
export default class Screen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: "Редактировать",
         headerBackImage: <Back />
      };
   };
   render() {
      return (
         <View style={styles.container}>
            <BusinessEdit />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
});
