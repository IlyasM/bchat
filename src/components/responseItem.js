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
                  uri={item.business.image && item.business.image.uri}
               />
               <View>
                  <Text numberOfLines={2} style={styles.name}>
                     {item.business.name}
                  </Text>
                  <Text numberOfLines={2} style={styles.category}>
                     {item.text}
                  </Text>
               </View>
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
   name: {
      marginLeft: 8,
      fontSize: 16,
      maxWidth: 240
   },
   category: {
      marginLeft: 8,
      fontSize: 14,
      maxWidth: 240,
      color: "rgb(120,120,120)"
   },
   image: {
      borderRadius: 22,
      height: 44,
      width: 44
   }
});
