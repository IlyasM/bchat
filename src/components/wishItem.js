import React, { PureComponent } from "react";
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
   Alert,
   LayoutAnimation
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import Colors from "../constants/Colors";
export default class Item extends PureComponent {
   yes = () => {
      const { item, yes } = this.props;
      this.props.navigation.navigate("EditReply", {
         item: item,
         action: yes,
         alert: true
      });
   };
   no = () => {
      this.props.no(this.props.item);
   };

   render() {
      const { text, category } = this.props.item;
      return (
         <View style={styles.container}>
            <View style={styles.categoryRow}>
               <Text style={styles.text}>
                  Можете помочь со следующим вопросом?
               </Text>
            </View>
            <View
               style={{ alignItems: "center", paddingTop: 7, paddingBottom: 7 }}
            >
               <Text style={styles.questionText}>{text}</Text>
            </View>
            <View style={styles.optionsRow}>
               <TouchableOpacity onPress={this.yes} style={styles.option}>
                  <Text
                     style={{
                        color: Colors.tintColor,
                        fontSize: 16,
                        fontWeight: "500"
                     }}
                  >
                     ДА
                  </Text>
               </TouchableOpacity>
               <View
                  style={{
                     width: 0.5,
                     backgroundColor: "rgb(200,200,200)"
                  }}
               />
               <TouchableOpacity onPress={this.no} style={styles.option}>
                  <Text
                     style={{ color: "red", fontSize: 16, fontWeight: "500" }}
                  >
                     НЕТ
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      width: WIDTH - 30,
      backgroundColor: "white",
      margin: 5,
      padding: 7,
      paddingBottom: 2,
      borderRadius: 4
   },
   categoryRow: {
      flexDirection: "row"
   },
   text: { color: "rgb(160,160,160)", fontSize: 15 },
   questionText: { fontSize: 16 },
   optionsRow: {
      flexDirection: "row",
      marginTop: 8,
      borderTopWidth: 0.5,
      borderTopColor: "rgb(200,200,200)"
   },
   option: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 4,
      padding: 8
   }
});
