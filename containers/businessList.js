import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import Separator from "../components/separator";
import FadeInImage from "../components/fadeImage";
import { Card, ListItem, Button, Avatar } from "react-native-elements";
import { generate } from "../fake-data";

export default class list extends Component {
   state = { data: null };

   componentWillMount() {
      generate(100).then(data => this.setState({ data }));
   }

   renderItem = ({ item }) => {
      return (
         <ListItem
            leftAvatar={
               <FadeInImage style={styles.image} uri={item.image.uri} />
            }
            title={item.name}
            subtitle={item.category}
            onPress={this.props.move}
            containerStyle={{ borderBottomWidth: 0, padding: 7 }}
         />
      );
   };
   renderSeparator = () => <Separator />;
   render() {
      if (!this.state.data) {
         return <Loading />;
      }
      return (
         <FlatList
            style={styles.root}
            data={this.state.data.list}
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
