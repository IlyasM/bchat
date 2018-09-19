import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import SearchBar from "../components/searchBar";
import Categories from "../containers/categoriesList";
export default class SearchScreen extends Component {
   render() {
      return (
         <View style={styles.container}>
            <SearchBar navigation={this.props.navigation} />
            <Categories />
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
