import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import { chats } from "../fake-data";
import Item from "../components/responseItem";
import Separator from "../components/separator";
import Pulse from "../components/pulse";
import Colors from "../constants/Colors";
export default class list extends Component {
   renderItem = ({ item }) => {
      return <Item navigation={this.props.navigation} item={item} />;
   };
   renderEmpty = () => (
      <View
         style={{ height: 300, justifyContent: "center", alignItems: "center" }}
      >
         {this.props.isActive && (
            <Pulse style={{ backgroundColor: Colors.tintColor }} />
         )}
         <Text style={{ marginTop: 55, fontSize: 16 }}>
            {this.props.isActive
               ? "Откликов пока нет, но скоро будут"
               : "Можете активировать заявку снова"}
         </Text>
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
