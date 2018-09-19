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
   componentWillMount() {
      this.props.loadData();
   }

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
      if (!this.props.data) {
         return <Loading />;
      }
      return (
         <FlatList
            style={styles.root}
            data={this.props.data.filtered}
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
   return { data: state.first.data };
};
const mapDispatchToProps = { loadData: loadActions.loadData };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(list);
