import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

let me = "#dcf8c6";
let from = "rgb(230,230,230)";

export default ({ item, next, navigation }) => {
   const marginTop = next && item.isMe === next.isMe ? 16 : 0;
   return (
      <View
         style={[
            styles.root,
            { alignItems: item.isMe ? "flex-end" : "flex-start" }
         ]}
      >
         <View
            style={[
               styles.container,
               {
                  backgroundColor: item.isMe ? me : from,
                  marginTop
               }
            ]}
         >
            <Text style={styles.text}>
               {item.text} {item.order}
            </Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   root: {},
   container: {
      paddingVertical: 10,
      padding: 12,
      marginHorizontal: 12,
      borderRadius: 5,
      maxWidth: WIDTH / 1.5,
      marginBottom: 7
      // shadowColor: "rgb(20,20,20)",
      // shadowOffset: { height: 2, width: 1 },
      // shadowOpacity: 0.1,
      // shadowRadius: 5
   },
   text: {
      fontSize: 16
   }
});
