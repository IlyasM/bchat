import React, { Component } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import BizList from "../containers/businessList";
import Question from "../components/question";
export default class CreateWish extends Component {
   static navigationOptions = ({ navigation }) => {
      return { title: navigation.getParam("category").name };
   };
   render() {
      const category = this.props.navigation.getParam("category");
      return (
         <View style={styles.container}>
            <KeyboardAvoidingView
               style={{ flex: 1 }}
               behavior="padding"
               keyboardVerticalOffset={65}
            >
               <BizList
                  category={category}
                  navigation={this.props.navigation}
               />
            </KeyboardAvoidingView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   }
});
