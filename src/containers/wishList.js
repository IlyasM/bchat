import React, { Component } from "react";
import {
   Text,
   View,
   Image,
   StyleSheet,
   FlatList,
   LayoutAnimation
} from "react-native";
import Loading from "../components/Loading";
import { chats } from "../fake-data";
import Item from "../components/wishItem";
import { connect } from "react-redux";
import { actions } from "../store/actions/wish";
import Separator from "../components/separator";
class list extends Component {
   componentWillMount() {
      this.props.wishLoad();
   }
   // componentWillUpdate() {
   //    LayoutAnimation.easeInEaseOut();
   // }
   renderItem = ({ item }) => {
      return (
         <Item
            yes={this.props.wishAccept}
            no={this.props.wishDecline}
            navigation={this.props.navigation}
            item={item}
         />
      );
   };
   renderEmpty = () => {
      return (
         <View
            style={{
               height: 500,
               justifyContent: "center",
               alignItems: "center"
            }}
         >
            <Text>Сюда будут поступать запросы</Text>
         </View>
      );
   };
   renderSeparator = () => <Separator full />;
   render() {
      return (
         <FlatList
            style={styles.root}
            data={this.props.list}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmpty}
            // ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={i => `${i.id}`}
         />
      );
   }
}

const styles = StyleSheet.create({
   root: { flex: 1 }
});

const mapStateToProps = state => {
   return {
      list: state.wish.wishList
   };
};

export default connect(
   mapStateToProps,
   actions
)(list);
