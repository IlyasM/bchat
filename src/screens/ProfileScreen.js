import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import ProfileCard from "../components/profileCard";
import IconButton from "../components/iconTextButton";

const items = [
   { text: "Уведомления", iconName: "ios-notifications", color: "#BD2031" },
   { text: "Заметки", iconName: "ios-document", color: "#22a7f0" },
   { text: "Конфиденциальность", iconName: "ios-lock", color: "#f89406" }
];

export default class Profile extends Component {
   static navigationOptions = {
      title: "Profile"
   };

   render() {
      return (
         <ScrollView contentContainerStyle={styles.container}>
            <ProfileCard />
            <View style={{ height: 40 }} />
            {items.map((item, i) => (
               <IconButton item={item} key={i} />
            ))}
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center"
   }
});
