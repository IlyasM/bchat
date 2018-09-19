import React, { Component } from "react";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   Keyboard,
   LayoutAnimation,
   Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { generate } from "../fake-data";
import Colors from "../constants/Colors";
const WIDTH = Dimensions.get("window").width;

export default class list extends Component {
   state = { show: false };
   componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
         "keyboardWillShow",
         this.keyboardDidShow
      );
   }

   componentWillUnmount() {
      this.keyboardDidShowListener.remove();
   }
   keyboardDidShow = () => {
      this.hide();
   };

   show = () => {
      requestAnimationFrame(() =>
         this.setState({ show: true }, () => {
            LayoutAnimation.configureNext({
               duration: 400,
               create: {
                  type: LayoutAnimation.Types.linear,
                  property: LayoutAnimation.Properties.opacity
               },
               update: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 0.9,
                  initialVelocity: 10
               }
            });
            this._root.setNativeProps({ style: { height: 200 } });
         })
      );
   };
   hide = () => {
      requestAnimationFrame(() =>
         this.setState({ show: false }, () => {
            LayoutAnimation.configureNext({
               duration: 400,
               create: {
                  type: LayoutAnimation.Types.linear,
                  property: LayoutAnimation.Properties.opacity
               },
               update: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 0.9,
                  initialVelocity: 10
               }
            });
            this._root.setNativeProps({ style: { height: 40 } });
         })
      );
   };
   render() {
      return (
         <View ref={r => (this._root = r)} style={styles.root}>
            <TouchableOpacity
               style={styles.closeButton}
               onPress={this.state.show ? this.hide : this.show}
            >
               <Icon
                  size={40}
                  name={
                     this.state.show
                        ? "ios-arrow-up-outline"
                        : "ios-arrow-down-outline"
                  }
                  color="white"
               />
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      height: 40,
      justifyContent: "center",
      alignItems: "center"
   },
   closeButton: {
      position: "absolute",
      bottom: 0,
      opacity: 0.8,
      backfaceVisibility: "hidden",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.tintColor,
      width: WIDTH
   }
});
