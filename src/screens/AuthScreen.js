import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { connect } from "react-redux";
import { actions } from "../store/actions/identity";
class Screen extends Component {
   onUser = () => {
      this.props.navigation.navigate("Main");
      this.props.connect(1);
   };
   onBiz = () => {
      this.props.navigation.navigate("Business");
      this.props.connect(
         2,
         1
      );
   };

   render() {
      return (
         <View style={styles.container}>
            <Button onPress={this.onUser} style={styles.button} title="user" />
            <Button
               onPress={this.onBiz}
               style={styles.button}
               title="business"
            />
         </View>
      );
   }
}
const mapDispatch = { connect: actions.connect };
export default connect(
   undefined,
   mapDispatch
)(Screen);
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   button: {
      margin: 40
   }
});
