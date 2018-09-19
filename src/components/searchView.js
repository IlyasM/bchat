import React, { Component } from "react";
import { Text, View } from "react-native";

export default class SearchView extends Component {
   render() {
      return <View style={styles.root} />;
   }
}
const styles = StyleSheet.create({
   root: { flex: 1, backgroundColor: "white", position: "absolute" }
});
