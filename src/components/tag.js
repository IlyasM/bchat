import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { cap } from "../constants/utils";
export default props => {
   return (
      <TouchableOpacity onPress={props.onPress} style={[styles.box]}>
         <Text style={styles.tag}>{cap(props.name)}</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   box: {
      justifyContent: "center",
      padding: 11,
      paddingTop: 7,
      paddingBottom: 7,
      borderRadius: 3,
      margin: 7,
      marginTop: 10,
      marginBottom: 0,
      borderWidth: 1,
      borderColor: "rgb(150,150,150)"
   },
   tag: {
      fontSize: 17
   }
});
