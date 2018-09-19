import React from "react";
import {
   Image,
   Text,
   View,
   StyleSheet,
   Button,
   StatusBar,
   TouchableOpacity,
   LayoutAnimation
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import BizList from "../containers/businessList";
import SlidingView from "../components/slidingView";
import HomeHeader from "../containers/homeHeader";
export default class HomeScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HomeHeader />,
         headerRight: (
            <TouchableOpacity
               style={styles.searchIcon}
               onPress={() => navigation.navigate("Search")}
            >
               <Icon name="ios-search" size={25} color="#2f95dc" />
            </TouchableOpacity>
         )
      };
   };

   render() {
      return (
         <View style={styles.container}>
            <BizList navigation={this.props.navigation} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff"
   },
   searchIcon: {
      paddingRight: 15,
      padding: 7
   }
});
