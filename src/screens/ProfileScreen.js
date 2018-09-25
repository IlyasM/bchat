import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import ProfileCard from "../components/profileCard";
import IconButton from "../components/iconTextButton";
import Back from "../components/backArrow";
const items = [
   { text: "Уведомления", iconName: "ios-notifications", color: "#BD2031" },
   { text: "Конфиденциальность", iconName: "ios-lock", color: "#f89406" }
];

export default class Profile extends Component {
   static navigationOptions = {
      title: "Профиль",
      headerBackImage: <Back />
   };

   render() {
      return (
         <ScrollView contentContainerStyle={styles.container}>
            <ProfileCard navigation={this.props.navigation} />
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
