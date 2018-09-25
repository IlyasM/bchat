import React, { Component } from "react";
import {
   Text,
   View,
   Image,
   Dimensions,
   TouchableOpacity,
   StyleSheet
} from "react-native";
import { me } from "../fake-data";
const WIDTH = Dimensions.get("window").width;
import FadeInImage from "../components/fadeImage";
import Icon from "react-native-vector-icons/Ionicons";
export default class ProfileCard extends Component {
   render() {
      return (
         <TouchableOpacity
            style={{
               backgroundColor: "white",
               padding: 10,
               width: WIDTH,
               borderBottomWidth: 0.5,
               borderBottomColor: "rgb(200,200,200)"
            }}
         >
            <View style={styles.row}>
               <TouchableOpacity
                  onPress={() => {
                     this.props.navigation.navigate("PhotoViewer", {
                        image: me.image
                     });
                  }}
               >
                  <FadeInImage style={styles.image} uri={me.image.uri} />
               </TouchableOpacity>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     width: WIDTH - 80
                  }}
               >
                  <View style={{ marginLeft: 15 }}>
                     <Text style={styles.name}>{me.name}</Text>
                     <Text>{me.phoneNumber}</Text>
                  </View>
                  <Icon
                     size={20}
                     style={{ transform: [{ rotate: "90deg" }] }}
                     color="rgb(200,200,200)"
                     name={"ios-arrow-up-outline"}
                  />
               </View>
            </View>
         </TouchableOpacity>
      );
   }
}
const styles = StyleSheet.create({
   row: { flexDirection: "row" },
   image: { borderRadius: 30, height: 60, width: 60 },
   name: {
      fontSize: 18,
      fontWeight: "600",
      margin: 5,
      marginLeft: 0
   }
});
