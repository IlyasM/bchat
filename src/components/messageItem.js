import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
let me = "#dcf8c6";
let from = "rgb(235,235,235)";

export default ({ item, next, navigation }) => {
   const marginTop = next && item.isMe === next.isMe ? 0 : 16;
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
            {item.isMe && (
               <View style={styles.row}>
                  <Icon name="ios-done-all" color="#1e8bc3" size={22} />
               </View>
            )}
            <View style={styles.timeBox}>
               <Text style={styles.time}>12:34</Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   root: {},
   container: {
      marginHorizontal: 12,
      borderRadius: 5,
      marginBottom: 5,
      maxWidth: WIDTH / 1.5
   },
   row: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      right: 45
   },
   secondIcon: {
      position: "absolute",
      left: 4,
      top: 0
   },
   timeBox: {
      position: "absolute",
      bottom: 8,
      right: 10
   },
   time: {
      fontSize: 10,
      fontWeight: "500",
      color: "rgb(100,100,100)"
   },
   text: {
      fontSize: 16,
      margin: 10,
      marginBottom: 20
   }
});
