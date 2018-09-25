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
const WIDTH = Dimensions.get("window").width;

export default class comp extends PureComponent {
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
               <TouchableOpacity style={styles.button}>
                  <Icon name="ios-call" color={"#3fc380"} size={30} />
               </TouchableOpacity>
               <FadeIn uri={image.uri} style={styles.image} />
               <TouchableOpacity style={styles.button}>
                  <Icon name="ios-map" color={"#2574a9"} size={30} />
               </TouchableOpacity>
            </View>
            <Text style={styles.name}> {name}</Text>
            <Text style={styles.address}>{address}</Text>

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
   address: { color: "rgb(50,50,50)" },
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
