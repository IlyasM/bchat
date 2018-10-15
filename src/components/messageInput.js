import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TextInput,
   TouchableOpacity,
   LayoutAnimation,
   Platform
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { window } from "../constants/Layout";
import ActionSheet from "react-native-actionsheet";
import { connect } from "react-redux";
import { uuid4 } from "fast-uuid";
import Colors from "../constants/Colors";
const color = "rgb(180,180,180)";
import { faq } from "../fake-data";

import { Constants, Location, Permissions, Camera } from "expo";
import { connectActionSheet } from "@expo/react-native-action-sheet";
@connectActionSheet
export default class MessageInput extends React.PureComponent {
   state = {
      text: "",
      height: 30,
      showSlider: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
   };
   _onOpenActionSheet = () => {
      // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
      let options = [
         "Выбрать фото из галерии",
         "Открыть камеру",
         "Поделиться геолокацией",
         "Отмена"
      ];
      let cancelButtonIndex = 3;

      this.props.showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
            title: "Прикрепить"
            // destructiveButtonIndex
         },
         buttonIndex => {
            switch (buttonIndex) {
               case 2:
                  this._getLocationAsync();
               case 1:
                  this._camera();
               default:
                  console.log("nope");
            }
            // Do something here depending on the button index selected
         }
      );
   };

   _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
         this.setState({
            errorMessage: "Permission to access location was denied"
         });
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      this.setState({ location });
   };
   _camera = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === "granted" });
   };
   _faq = () => {
      let options = [...faq, "Отмена"];
      let cancelButtonIndex = options.length;
      this.props.showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
            title: "Часто задаваемые вопросы"
            // destructiveButtonIndex
         },
         buttonIndex => {
            console.log(options[buttonIndex]);
            // Do something here depending on the button index selected
         }
      );
   };

   _onChangeText = text => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
         text
      });
      this.props.typing(this.props.to);
   };
   _onContentSizeChange = event => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
         height: event.nativeEvent.contentSize.height
      });
   };

   _onSend = () => {
      if (this.state.text.trim() === "") {
         return;
      }
      const message = {
         to_id: this.props.to,
         from_id: this.props.myId,
         text: this.state.text.trim(),
         type: "message"
      };
      this.props.push(message);
      this.setState(state => ({ text: "" }));
   };
   renderSendButton = () => {
      return (
         <Ionicons
            name={"ios-send"}
            size={32}
            color={
               this.state.text.trim() === ""
                  ? "rgb(170,170,170)"
                  : Colors.tintColor
            }
         />
      );
   };

   render() {
      return (
         <View
            style={[
               styles.container,
               { height: Math.min(Math.max(48, this.state.height + 14), 158) }
            ]}
         >
            <TouchableOpacity
               onPress={this._onOpenActionSheet}
               style={styles.plusWrap}
            >
               <Ionicons
                  name={"ios-attach"}
                  size={30}
                  style={styles.icon}
                  color={Colors.tintColor}
               />
            </TouchableOpacity>
            <View style={[styles.inputWrap]}>
               <TextInput
                  style={[
                     styles.textInput,
                     { height: Math.min(Math.max(30, this.state.height), 140) }
                  ]}
                  value={this.state.text}
                  onChangeText={this._onChangeText}
                  onContentSizeChange={this._onContentSizeChange}
                  placeholderTextColor={color}
                  multiline
               />
            </View>
            <TouchableOpacity onPress={this._onSend} style={styles.buttonWrap}>
               {this.renderSendButton()}
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      borderTopWidth: 0.5,
      borderTopColor: "rgb(220,220,220)"
   },
   inputWrap: {
      paddingVertical: 2,
      flex: 5,
      flexDirection: "row",
      borderWidth: 1,
      paddingHorizontal: 10,
      borderColor: "rgb(230,230,230)",
      alignItems: "center",
      borderRadius: 4
   },
   plusWrap: {
      flex: 0.5,
      padding: 5,
      paddingLeft: 20
   },
   buttonWrap: {
      flex: 0.6,
      paddingLeft: 12
   },

   textInput: {
      flex: 1,
      fontWeight: "500",
      fontSize: 16,
      height: 36,
      color: "rgb(90,90,90)"
   }
});
