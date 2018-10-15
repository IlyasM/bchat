import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { categories } from "../fake-data";

export default class list extends Component {
   renderItem = ({ item }) => {
      return (
         <TouchableOpacity style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.name.toLowerCase()}</Text>
         </TouchableOpacity>
      );
   };
   render() {
      return (
         <FlatList
            style={styles.root}
            data={categories}
            renderItem={this.renderItem}
            keyExtractor={i => `${i.id}`}
            keyboardDismissMode="interactive"
         />
      );
   }
}

const styles = StyleSheet.create({
   root: { flex: 1, marginTop: 20 },
   categoryContainer: {
      padding: 6,
      paddingLeft: 16
   },
   categoryText: { fontSize: 22, fontWeight: "800", color: "rgb(85,85,85)" }
});
