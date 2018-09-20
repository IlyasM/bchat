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
import { loadActions } from "../store/actions/firstActions";
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
      <Question
         category={this.props.category}
         broadcast={() => console.log("brodcasting question")}
      />
   );
   render() {
      const { data, category } = this.props;

      const source = data.filter(item => item.category.id === category.id);
      return (
         <FlatList
            keyboardShouldPersistTaps="always"
            data={source}
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
const mapDispatchToProps = { loadData: loadActions.loadData };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(list);
