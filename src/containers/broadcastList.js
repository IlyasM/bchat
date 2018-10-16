import React, { Component } from "react";
import {
   Text,
   View,
   Image,
   StyleSheet,
   FlatList,
   KeyboardAvoidingView,
   LayoutAnimation
} from "react-native";
import Loading from "../components/Loading";
import Separator from "../components/separator";
import { connect } from "react-redux";
import { actions } from "../store/actions/broadcast";
import QuestionCard from "../components/questionCard";
class list extends Component {
   toTop = () => {
      this.flat.scrollToOffset({
         offset: 0,
         animated: true
      });
   };
   // componentWillUpdate() {
   //    requestAnimationFrame(() => {
   //       LayoutAnimation.easeInEaseOut();
   //    });
   // }
   componentDidMount() {
      this.props.navigation.addListener("willFocus", route => {
         this.toTop();
      });
   }
   componentWillUnmount() {
      this.props.navigation.removeListener("willFocus");
   }

   renderItem = ({ item }) => {
      return (
         <QuestionCard
            toggle={this.props.broadcastToggle}
            navigation={this.props.navigation}
            broadcastId={item}
         />
      );
   };
   // renderHeader = () => <Header />;
   renderSeparator = () => <Separator full />;
   renderEmpty = () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>Пока нет запросов</Text>
      </View>
   );
   render() {
      const list = this.props.list;

      return (
         <FlatList
            ref={el => (this.flat = el)}
            style={styles.root}
            horizontal
            pagingEnabled
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={list}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmpty}
            // ListHeaderComponent={this.renderHeader}
            // ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={i => `${i}`}
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
   return {
      list: state.data.broadcasts.allIds,
      isActive: state.broadcast.activeTab
   };
};

export default connect(
   mapStateToProps,
   actions
)(list);
