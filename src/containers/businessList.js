import React, { Component } from "react";
import {
   Text,
   View,
   Image,
   StyleSheet,
   FlatList,
   KeyboardAvoidingView
} from "react-native";
import Loading from "../components/Loading";
import Separator from "../components/separator";
import FadeInImage from "../components/fadeImage";
import { Card, ListItem, Button, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { generate } from "../fake-data";
import { actions } from "../store/actions/broadcast";
import HomeItem from "../components/listItem";
import Question from "../components/question";
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
   renderHeader = () => (
      <View>
         {this.props.category && (
            <Question
               navigation={this.props.navigation}
               category={this.props.category}
               broadcast={this.props.create}
            />
         )}
      </View>
   );
   render() {
      const { data, category } = this.props;

      const source = category
         ? data.filter(item => item.category.id === category.id)
         : data;
      return (
         <FlatList
            keyboardShouldPersistTaps="always"
            data={source}
            keyboardDismissMode="on-drag"
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={i => `${i.id}`}
            stickyHeaderIndices={[0]}
         />
      );
   }
}

const styles = StyleSheet.create({
   image: { borderRadius: 20, height: 40, width: 40 }
});
const mapStateToProps = state => {
   return { data: state.businesses.list };
};
const mapDispatchToProps = { create: actions.broadcast };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(list);
