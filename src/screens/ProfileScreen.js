import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   TouchableOpacity
} from "react-native";
import ProfileCard from "../components/profileCard";
import IconButton from "../components/iconTextButton";
import Icon from "react-native-vector-icons/Ionicons";
import BroadcastList from "../containers/broadcastList";
const items = [
   { text: "Уведомления", iconName: "ios-notifications", color: "#BD2031" },
   // { text: "Заметки", iconName: "ios-document", color: "#22a7f0" },
   { text: "Конфиденциальность", iconName: "ios-lock", color: "#22a7f0" }
];

export default class Profile extends Component {
   static navigationOptions = ({ navigation }) => ({
      title: "Profile",
      headerRight: (
         <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate("Search")}
         >
            <Icon name="ios-settings" size={25} color="#2f95dc" />
         </TouchableOpacity>
      )
   });

   render() {
      return (
         <View style={styles.container}>
            <ProfileCard />

            <BroadcastList />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white"
   },
   settingsIcon: {
      paddingRight: 15,
      padding: 7
   }
});
