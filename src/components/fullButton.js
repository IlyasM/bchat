import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
export default ({ onPress, text }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.send}>
         <Text style={styles.sendText}>{text}</Text>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   send: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.tintColor,
      paddingVertical: 14,
      paddingHorizontal: 20
   },
   sendText: {
      color: "white",
      fontWeight: "500",
      fontSize: 18
   }
});
