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
import ResponseList from "../containers/responseList";
import Separator from "../components/separator";
import { replies } from "../fake-data";
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
            <View
               style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "rgb(200,200,200)"
               }}
            >
               <Text style={styles.text}>{text}</Text>
            </View>
            <ResponseList navigation={this.props.navigation} data={replies()} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      margin: 10,
      padding: 8,
      width: WIDTH - 20,
      backgroundColor: "white",
      borderRadius: 5
   },
   row: {
      alignItems: "center",
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between"
   },
   categoryText: { color: "rgb(120,120,120)", fontFamily: "bebas" },
   text: { fontSize: 15, paddingTop: 8, marginBottom: 14 }
});

export default QuestionCard;
