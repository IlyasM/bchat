import React, { PureComponent } from "react";
import {
   Text,
   View,
   ScrollView,
   StyleSheet,
   TouchableOpacity,
   Dimensions
} from "react-native";
import { bizList } from "../fake-data";
import FadeIn from "../components/fadeImage";
import Icon from "react-native-vector-icons/Ionicons";
import ActionSheet from "react-native-actionsheet";
import call from "react-native-phone-call";

const WIDTH = Dimensions.get("window").width;
import Separator from "../components/separator";
import { connectActionSheet } from "@expo/react-native-action-sheet";
@connectActionSheet
export default class comp extends PureComponent {
   call = () => {
      let options = [
         ...this.props.navigation.getParam("phoneNumbers"),
         "Отмена"
      ];
      let cancelButtonIndex = options.length - 1;
      this.props.showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
            title: "Позвонить"
         },
         buttonIndex => {
            if (buttonIndex === cancelButtonIndex) return;
            const args = { number: options[buttonIndex] };
            call(args).catch(console.error);
         }
      );
   };
   open = () => {
      this.props.navigation.navigate("PhotoViewer", {
         image: this.props.navigation.getParam("image")
      });
   };
   map = () => {
      this.props.navigation.navigate("Map");
   };
   render() {
      const {
         name,
         address,
         phoneNumbers,
         description,
         shortDescription,
         image,
         category
      } = this.props.navigation.state.params;
      return (
         <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.row}>
               <TouchableOpacity onPress={this.call} style={styles.button}>
                  <Icon name="ios-call" color={"#3fc380"} size={30} />
               </TouchableOpacity>
               <TouchableOpacity onPress={this.open}>
                  <FadeIn uri={image.uri} style={styles.image} />
               </TouchableOpacity>

               <TouchableOpacity onPress={this.map} style={styles.button}>
                  <Icon name="ios-map" color={"#2574a9"} size={30} />
               </TouchableOpacity>
            </View>
            <Text style={styles.name}> {name}</Text>
            <Text style={styles.address}>{address}</Text>
            <Separator full />

            <Text style={styles.description}>{description}</Text>
         </ScrollView>
      );
   }
}
const styles = StyleSheet.create({
   scrollView: {
      backgroundColor: "white",
      flex: 1,
      alignItems: "center"
   },
   image: {
      height: 140,
      width: 140,
      borderRadius: 70
   },
   address: { color: "rgb(50,50,50)", marginBottom: 10 },
   button: {
      height: 50,
      width: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: "rgb(230,230,230)",
      paddingTop: 3,
      alignItems: "center",
      justifyContent: "center"
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
      width: WIDTH,
      justifyContent: "space-around",
      margin: 5,
      padding: 5
   },
   name: {
      fontSize: 16,
      fontWeight: "600",
      margin: 5
   },
   description: {
      color: "rgb(100,100,100)",
      marginHorizontal: 10,
      margin: 10
   }
});
