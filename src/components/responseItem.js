import React, { PureComponent } from "react";
import {
   Text,
   View,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from "react-native";
import FadeInImage from "./fadeImage";
const WIDTH = Dimensions.get("window").width;
export default class Item extends PureComponent {
   move = () => {
      this.props.navigation.navigate("Chat", this.props.item.business);
   };
   render() {
      const { item } = this.props;
      return (
         <TouchableOpacity onPress={this.move} style={styles.root}>
            <View style={styles.row}>
               <FadeInImage
                  style={styles.image}
                  uri={item.business.image.uri}
               />
               <Text numberOfLines={2} style={styles.category}>
                  {item.reply}
               </Text>
            </View>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      width: WIDTH - 20,
      justifyContent: "space-between"
   },
   row: {
      flexDirection: "row",
      alignItems: "center"
   },
   category: {
      marginLeft: 8,
      fontSize: 14,
      maxWidth: 240
   },
   image: {
      borderRadius: 15,
      height: 30,
      width: 30
   }
});
