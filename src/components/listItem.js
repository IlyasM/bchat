import React, { PureComponent } from "react";
import {
   Text,
   View,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from "react-native";
import FadeInImage from "./fadeImage";
import Tag from "./tag";
import { Badge } from "react-native-elements";
const WIDTH = Dimensions.get("window").width;
import { connect } from "react-redux";

class HomeItem extends PureComponent {
   move = () => {
      this.props.navigation.navigate("Chat", this.props.item);
   };
   render() {
      const { item, accountMode } = this.props;
      if (!item) return null;
      return (
         <TouchableOpacity onPress={this.move} style={styles.root}>
            <View style={styles.row}>
               <FadeInImage
                  style={styles.image}
                  uri={item.image && item.image.uri}
               />
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center"
                  }}
               >
                  <View style={styles.nameTag}>
                     {item.category && (
                        <Text style={styles.topCategory}>
                           {item.category.name.toUpperCase()}
                        </Text>
                     )}
                     <Text numberOfLines={1} style={styles.name}>
                        {item.name}
                     </Text>
                     {item.typing ? (
                        <Text style={styles.category}>typing...</Text>
                     ) : (
                        <Text numberOfLines={2} style={styles.category}>
                           {item.last && item.last.text}
                        </Text>
                     )}
                  </View>
               </View>
            </View>

            {item.count > 0 && <Badge value={item.count} />}
         </TouchableOpacity>
      );
   }
}
const mapState = (state, props) => {
   return { item: state.data.chats.byIds[props.chatId] };
};
export default connect(mapState)(HomeItem);
const styles = StyleSheet.create({
   root: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      width: WIDTH,
      justifyContent: "space-between"
   },
   row: {
      flexDirection: "row",
      alignItems: "center"
   },
   nameTag: {
      marginLeft: 10
   },
   category: {
      fontSize: 14,
      maxWidth: 240
   },
   topCategory: {
      fontSize: 12,
      color: "rgb(130,130,140)"
   },
   name: {
      fontSize: 16,
      fontWeight: "600",
      margin: 5,
      marginLeft: 0,
      maxWidth: 240
   },
   dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      margin: 8,
      backgroundColor: "rgb(200,200,200)"
   },
   image: {
      borderRadius: 24,
      height: 48,
      width: 48
   }
});
