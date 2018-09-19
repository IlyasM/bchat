import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput } from "react-native";
import Chooser from "../components/tagChooser";
import Search from "../components/searchInput";
import { categories } from "../fake-data";
import { connect } from "react-redux";
import { actions } from "../store/actions/filter";

class Create extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: "Я ищу"
      };
   };
   componentDidMount() {
      this.props.navigation.addListener("willFocus", route => {
         this.search.focus();
      });
   }
   componentWillUnmount() {
      this.props.navigation.removeListener("willFocus");
   }
   state = { text: "" };
   _onChangeText = text => {
      this.props.search(text.trim());
   };
   render() {
      return (
         <View style={styles.container}>
            <Search
               ref={el => (this.search = el)}
               query={this.props.query}
               search={this.props.search}
            />
            <ScrollView
               // keyboardDismissMode="none"
               keyboardShouldPersistTaps="always"
            >
               <Chooser
                  navigation={this.props.navigation}
                  categories={this.props.categories}
               />
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center"
   },
   textInput: { height: 30, width: 200, paddingLeft: 10 }
});
const mapStateToProps = state => {
   return { categories: state.filter.results, query: state.filter.query };
};
const mapDispatchToProps = { search: actions.filter };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Create);
