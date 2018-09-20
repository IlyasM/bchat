import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import { chats } from "../fake-data";
import Item from "../components/responseItem";
import Separator from "../components/separator";
export default class list extends Component {
   renderItem = ({ item }) => {
      return <Item navigation={this.props.navigation} item={item} />;
   };
   renderEmpty = () => (
      <View
         style={{ height: 100, justifyContent: "center", alignItems: "center" }}
      >
         <Text>Пока нет откликов, но скоро будут)</Text>
      </View>
   );
   renderSeparator = () => <Separator full />;
   render() {
      return (
         <FlatList
            style={styles.root}
            data={this.props.data}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={i => `${i.id}`}
         />
      );
   }
}

const styles = StyleSheet.create({
   root: { flex: 1 }
});
