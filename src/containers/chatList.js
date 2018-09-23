import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import { chats } from "../fake-data";
import HomeItem from "../components/listItem";
import Separator from "../components/separator";
export default class list extends Component {
   renderItem = ({ item }) => {
      return (
         <HomeItem
            accountMode={this.props.mode}
            mode={"chat"}
            navigation={this.props.navigation}
            item={item}
         />
      );
   };
   renderSeparator = () => <Separator />;
   render() {
      return (
         <FlatList
            style={styles.root}
            data={chats}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={i => `${i.id}`}
         />
      );
   }
}

const styles = StyleSheet.create({
   root: { flex: 1 },
   image: { borderRadius: 20, height: 40, width: 40 }
});
