import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import SearchInput from "../components/searchInput";
export default class Wishes extends Component {
   render() {
      return (
         <View style={styles.container}>
            <SearchInput />/
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center"
   }
});
