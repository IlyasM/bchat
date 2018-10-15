import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import momentTz from "moment-timezone";
const me = "#dcf8c6";
const from = "rgb(235,235,235)";
const blueTick = "#1e8bc3";
const greyTick = "rgb(160,160,160)";

export default class item extends Component {
   // shouldComponentUpdate = (nextProps, nextState) => {
   //    return false;
   // };

   render() {
      const { item, previous, navigation, myId } = this.props;
      const isMe = item.from_id === myId;
      const sameAuthor = previous && previous.from_id === item.from_id;
      const marginBottom = previous && sameAuthor ? 3 : 16;
      const mark = item.mark === "saved" ? "ios-checkmark" : "ios-done-all";
      const markColor = item.mark === "seen" ? blueTick : greyTick;
      const timeZone = "Etc/GMT+6";
      return (
         <View
            style={[
               styles.root,
               { alignItems: isMe ? "flex-end" : "flex-start" }
            ]}
         >
            <View
               style={[
                  styles.container,
                  {
                     backgroundColor: isMe ? me : from,
                     marginBottom
                  }
               ]}
            >
               <Text style={styles.text}>{item.text}</Text>
               {isMe && (
                  <View style={styles.row}>
                     <Icon name={mark} color={markColor} size={22} />
                  </View>
               )}
               <View style={styles.timeBox}>
                  <Text style={styles.time}>
                     {momentTz.tz(item.inserted_at, timeZone).format("HH:mm")}
                  </Text>
               </View>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {},
   container: {
      marginHorizontal: 12,
      minWidth: 60,
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
