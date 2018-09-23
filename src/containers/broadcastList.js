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
import { connect } from "react-redux";
import { categories } from "../fake-data";
import { actions } from "../store/actions/broadcast";
import QuestionCard from "../components/questionCard";
import Header from "../components/questionsHeader";
let data = [
   {
      text: "Нужно заменить масло в течение часа?",
      active: true,
      category: categories[9]
   },
   {
      text: "Ищу квартиру на ночь сегодня",
      active: false,
      category: categories[1]
   }
];
class list extends Component {
   renderItem = ({ item }) => {
      return <QuestionCard navigation={this.props.navigation} item={item} />;
   };
   // renderHeader = () => <Header />;
   renderSeparator = () => <Separator full />;
   renderEmpty = () => (
      <View
         style={{ height: 100, justifyContent: "center", alignItems: "center" }}
      >
         <Text>Пока нет запросов</Text>
      </View>
   );
   render() {
      return (
         <FlatList
            style={styles.root}
            horizontal
            pagingEnabled
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={data}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmpty}
            // ListHeaderComponent={this.renderHeader}
            // ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={i => `${i.text}`}
         />
      );
   }
}

const styles = StyleSheet.create({
   root: { flex: 1 },
   header: { alignItems: "center" },
   headerText: {
      margin: 8,
      fontSize: 17,
      fontWeight: "600"
   }
});
const mapStateToProps = state => {
   return { list: state.broadcast.myBroadcasts };
};
const mapDispatchToProps = { toggle: actions.toggle };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(list);
