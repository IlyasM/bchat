import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import MessageList from "../containers/messageList";
import Back from "../components/backArrow";
import FadeInImage from "../components/fadeImage";
export default class MessagesScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      let image = navigation.getParam("image");
      return {
         headerTitle: (
            <TouchableOpacity
               onPress={() => {
                  navigation.navigate(
                     "BusinessProfile",
                     navigation.state.params
                  );
               }}
               style={{ alignItems: "center", width: 200 }}
            >
               <Text numberOfLines={1} style={styles.name}>
                  {navigation.getParam("name")}
               </Text>
               {navigation.getParam("online") && (
                  <Text style={styles.online}>Online</Text>
               )}
            </TouchableOpacity>
         ),
         headerBackImage: <Back />,
         headerRight: (
            <TouchableOpacity
               onPress={() => {
                  navigation.navigate("PhotoViewer", {
                     image: navigation.getParam("image")
                  });
               }}
               style={styles.imageContainer}
            >
               <FadeInImage style={styles.image} uri={image && image.uri} />
            </TouchableOpacity>
         )
      };
   };

   render() {
      const params = this.props.navigation.state.params;
      const to = params.category
         ? `business:${params.id}`
         : `user:${params.id}`;
      return (
         <View style={styles.container}>
            <MessageList to={to} navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   },
   imageContainer: {
      paddingRight: 8
   },
   name: {
      fontWeight: "600",
      fontSize: 17
   },
   online: {
      color: "rgb(170,170,170)"
   },
   image: {
      borderRadius: 15,
      height: 30,
      width: 30
   }
});
