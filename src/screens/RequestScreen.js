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
import Header from "../containers/questionsHeader";
import ProfileIcon from "../containers/profileIcon";
const items = [
  { text: "Уведомления", iconName: "ios-notifications", color: "#BD2031" },
  // { text: "Заметки", iconName: "ios-document", color: "#22a7f0" },
  { text: "Конфиденциальность", iconName: "ios-lock", color: "#22a7f0" }
];

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Header />,
    headerRight: <ProfileIcon navigation={navigation} />
  });

  render() {
    return (
      <View style={styles.container}>
        <BroadcastList
          ref={el => (this.list = el)}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    // backgroundColor: "white"
  },
  settingsIcon: {
    paddingRight: 15,
    padding: 7
  }
});
