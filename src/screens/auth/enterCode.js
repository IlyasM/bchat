import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import Back from "../../components/backArrow";
import Icon from "react-native-vector-icons/Ionicons";

export default class componentName extends Component {
   static navigationOptions = {
      title: "Введите код",
      headerBackImage: <Back />
   };
   state = { errorText: "" };
   fulfill = code => {
      console.log(code);
      // send request to verify code
      // on success token will be saved and go to enter name screen
      // on failure display whether incorrect code or expired
      // if expired send to /register again
   };
   clear = () => {
      this.code.clear();
   };
   render() {
      return (
         <View style={styles.root}>
            <CodeInput
               ref={ref => (this.code = ref)}
               // secureTextEntry
               inactiveColor={"rgb(100,100,100)"}
               activeColor="black"
               className={"border-b"}
               codeInputStyle={{ fontSize: 18 }}
               keyboardType="numeric"
               containerStyle={{ marginTop: 80 }}
               space={8}
               size={35}
               codeLength={4}
               onFulfill={this.fulfill}
            />
            <Text style={styles.error}>{this.state.errorText}</Text>
            <TouchableOpacity onPress={this.clear} style={styles.close}>
               <Icon name="ios-close" color={"rgb(100,100,100)"} size={40} />
            </TouchableOpacity>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   root: {
      backgroundColor: "white",
      flex: 1,
      alignItems: "center"
   },
   close: {
      position: "absolute",
      top: 5,
      right: 20,
      padding: 5
   },
   error: {
      position: "absolute",
      top: 140,
      color: "red"
   }
});
