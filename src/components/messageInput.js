import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TextInput,
   TouchableOpacity,
   LayoutAnimation
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { window } from "../constants/Layout";
import ActionSheet from "react-native-actionsheet";
import { connect } from "react-redux";
import { uuid4 } from "fast-uuid";
import Colors from "../constants/Colors";
const color = "rgb(180,180,180)";
export default class MessageInput extends React.PureComponent {
   state = {
      text: "",
      height: 30,
      showSlider: false
   };

   _showActionSheet = () => {
      this.ActionSheet.show();
   };
   _onChangeText = text => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
         text
      });
   };
   _onContentSizeChange = event => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
         height: event.nativeEvent.contentSize.height
      });
   };

   _onSend = () => {
      if (this.state.text.trim() === "") {
         this._showActionSheet();
         return;
      }
      const message = {
         id: uuid4(),
         isMe: true,
         order: this.props.lastMessageId + 1,
         text: this.state.text.trim()
      };
      // this.props.send("joy", message);
      this.setState(state => ({ text: "" }));
   };
   renderSendButton = () => {
      return this.state.text.trim() === "" ? (
         <Ionicons
            name={"ios-arrow-dropup"}
            size={26}
            color={Colors.tintColor}
         />
      ) : (
         <Ionicons name={"ios-send"} size={32} color={Colors.tintColor} />
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
            <TouchableOpacity style={styles.plusWrap}>
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
            <ActionSheet
               ref={o => (this.ActionSheet = o)}
               title={"Выберите быстрое действие"}
               options={[
                  "Забронировать столик",
                  "Меню бизнес ланча",
                  "Добрый день!",
                  "Хорошего дня",
                  "Отмена"
               ]}
               cancelButtonIndex={4}
               destructiveButtonIndex={5}
               onPress={index => {
                  /* do something */
               }}
            />
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
      paddingLeft: 10
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
