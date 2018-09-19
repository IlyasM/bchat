import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
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
            <Question />
            <BizList category={category} navigation={this.props.navigation} />
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
