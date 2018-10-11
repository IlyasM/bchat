import React, { PureComponent } from "react";
import {
   Text,
   View,
   TouchableOpacity,
   Dimensions,
   StyleSheet
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
@withNavigation
export default class IconTextButton extends PureComponent {
   go = () => {
      const go = this.props.navigation.navigate;
      switch (this.props.item.text) {
         case "Редактировать":
            go("BusinessEdit");
         case "Конфиденциальность":
      }
   };
   render() {
      const { text, iconName, color } = this.props.item;

      return (
         <TouchableOpacity onPress={this.go} style={styles.root}>
            <View style={styles.row}>
               <View style={styles.iconContainer}>
                  <Icon name={iconName} size={20} color={color} />
               </View>
               <Text style={styles.text}>{text}</Text>
            </View>
            <Icon
               size={20}
               style={{ transform: [{ rotate: "90deg" }] }}
               color="rgb(200,200,200)"
               name={"ios-arrow-up-outline"}
            />
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      width: WIDTH,
      backgroundColor: "white",
      alignItems: "center",
      flexDirection: "row",
      borderBottomWidth: 0.5,
      borderBottomColor: "rgb(230,230,230)",
      padding: 10,
      justifyContent: "space-between"
   },
   iconContainer: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center"
   },
   text: {
      fontSize: 16,
      marginLeft: 10
   },
   row: { flexDirection: "row", alignItems: "center" }
});
