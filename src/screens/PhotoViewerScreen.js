import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import ZoomView from "../components/zoomView";
import Icon from "react-native-vector-icons/Ionicons";

export default class Screen extends Component {
   static navigationOptions = ({ navigation }) => ({
      gestureResponseDistance: 200
   });
   render() {
      return (
         <View style={styles.container}>
            <ZoomView navigation={this.props.navigation} />
            <TouchableOpacity
               onPress={() => this.props.navigation.goBack()}
               style={styles.close}
            >
               <Icon name="ios-close" color={"white"} size={48} />
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 60,
      flex: 1,
      backgroundColor: "rgb(30,30,30)"
   },
   close: {
      position: "absolute",
      top: 20,
      right: 20,
      padding: 5
   }
});
