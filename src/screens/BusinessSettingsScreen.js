import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Back from "../components/backArrow";
import BusinessProfile from "../components/businessProfile";
import { business } from "../fake-data";
import IconButton from "../components/iconTextButton";
import { ScrollView } from "react-native-gesture-handler";

const items = [
   { text: "Редактировать", iconName: "ios-create", color: "#22a7f0" },
   { text: "Добавить операторов", iconName: "ios-people", color: "#2ecc71" },
   { text: "Уведомления", iconName: "ios-notifications", color: "#BD2031" },
   { text: "Конфиденциальность", iconName: "ios-lock", color: "#f89406" }
];
const biz = business();

export default class Screen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: "Профиль",
         headerBackImage: <Back />
      };
   };
   render() {
      return (
         <ScrollView contentContainerStyle={styles.container}>
            <BusinessProfile
               business={biz}
               navigation={this.props.navigation}
            />
            {items.map((item, i) => (
               <IconButton item={item} key={i} />
            ))}
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
});
