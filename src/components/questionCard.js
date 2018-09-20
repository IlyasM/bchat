import React, { PureComponent } from "react";
import {
   Text,
   View,
   FlatList,
   StyleSheet,
   Switch,
   Dimensions
} from "react-native";
const WIDTH = Dimensions.get("window").width;
export class QuestionCard extends PureComponent {
   render() {
      const { category, text, active } = this.props.item;
      return (
         <View style={styles.root}>
            <View style={styles.row}>
               <Text style={styles.categoryText}>
                  {category.name.toUpperCase()}
               </Text>
               <Switch value={active} />
            </View>
            <Text style={styles.text}>{text}</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: { margin: 5, padding: 8, width: WIDTH - 8 },
   row: {
      alignItems: "center",
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 0.5,
      borderBottomColor: "rgb(200,200,200)"
   },
   categoryText: { color: "rgb(120,120,120)", fontFamily: "bebas" },
   text: { fontSize: 15, paddingTop: 8 }
});

export default QuestionCard;
