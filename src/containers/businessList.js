import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import Separator from "../components/separator";
import FadeInImage from "../components/fadeImage";
import { Card, ListItem, Button, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { generate } from "../fake-data";
import { loadActions } from "../store/actions/firstActions";
import HomeItem from "../components/listItem";
class list extends Component {
   renderItem = ({ item }) => {
      return (
         <HomeItem
            mode={"home"}
            navigation={this.props.navigation}
            item={item}
         />
      );
   };
   renderSeparator = () => <Separator />;
   render() {
      const { data, category } = this.props;

      const source = data.filter(item => item.category.id === category.id);
      return (
         <FlatList
            style={styles.root}
            data={source}
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
const mapStateToProps = state => {
   return { data: state.businesses.list };
};
const mapDispatchToProps = { loadData: loadActions.loadData };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(list);
