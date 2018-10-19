import React, { Component } from "react";

import { createStackNavigator } from "react-navigation";
import CreateUser from "./createUser";
import CreateBusiness from "./createBusiness";
import { Text, View, Button, StyleSheet } from "react-native";

class Choice extends Component {
   static navigationOptions = {
      title: "Выбрать"
   };
   user = () => {
      this.props.navigation.navigate("CreateUser");
   };
   biz = () => {
      this.props.navigation.navigate("CreateBusiness");
   };

   render() {
      return (
         <View style={styles.root}>
            <View style={styles.button}>
               <Button title={"Войти как пользователь"} onPress={this.user} />
            </View>
            <Text style={styles.orText}>Или</Text>
            <View style={styles.button}>
               <Button title={"Войти как бизнес/услуга"} onPress={this.biz} />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: "white",
      // justifyContent: "center",
      alignItems: "center"
   },
   button: { marginTop: 25 },
   orText: { fontSize: 17, marginTop: 25 }
});

export default createStackNavigator({
   Choice,
   CreateUser,
   CreateBusiness
});
