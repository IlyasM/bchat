import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TextInput,
   Alert,
   KeyboardAvoidingView,
   Dimensions,
   ScrollView,
   TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
const HEIGHT = Dimensions.get("window").height;
@withNavigation
export default class EditReply extends Component {
   state = { text: this.props.text };
   static defaultProps = {
      text: "Да я смогу Вам помочь! ",
      placeholderText:
         "Укажите свой ответ, и по возможности, стоимость разрешения вопроса",
      buttonText: "Отправить",
      title: "Запишите свой ответ"
   };

   componentDidMount() {
      requestAnimationFrame(() => {
         this._textInput && this._textInput.focus();
      });
   }
   _onChangeText = text => {
      this.setState({
         text
      });
   };
   delayGoBack = () => {
      requestAnimationFrame(() => {
         this.props.navigation.goBack();
      });
   };

   send = () => {
      const { action, item, alert } = this.props.navigation.state.params;
      if (this.state.text.trim() === "") return;
      //item is broadcast
      action(item, this.state.text.trim());
      this.delayGoBack();
      if (!alert) return;

      Alert.alert(
         "Ваш ответ поступил",
         "Пользователь возможно вам напишет",
         [{ text: "OK", onPress: null }],
         { cancelable: false }
      );
   };
   render() {
      const { buttonText, placeholderText, title, navigation } = this.props;
      // const { action, item } = navigation.state.params;

      return (
         <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{ flex: 1 }}>
               <Text style={styles.title}>{title}</Text>
               <TextInput
                  ref={view => {
                     this._textInput = view;
                  }}
                  style={[styles.input]}
                  value={this.state.text}
                  onChangeText={this._onChangeText}
                  placeholder={placeholderText}
                  multiline
               />
               <View
                  style={{
                     margin: 10,
                     justifyContent: "center",
                     alignItems: "center"
                  }}
               >
                  <Text style={{ fontSize: 16 }}>{placeholderText}</Text>
               </View>
               <TouchableOpacity onPress={this.send} style={styles.send}>
                  <Text style={styles.sendText}>{buttonText}</Text>
               </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.delayGoBack} style={styles.close}>
               <Icon name="ios-close" color={"rgb(100,100,100)"} size={40} />
            </TouchableOpacity>
         </KeyboardAvoidingView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 50
   },
   buttonContainer: {
      justifyContent: "center",
      alignItems: "center"
   },
   title: {
      margin: 10,
      marginLeft: 20,
      fontSize: 18,
      color: "rgb(100,100,100)",
      fontWeight: "500"
   },
   close: {
      position: "absolute",
      top: 40,
      right: 20,
      padding: 5
   },
   send: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.tintColor,
      paddingVertical: 14,
      paddingHorizontal: 20
   },
   sendText: {
      color: "white",
      fontWeight: "500",
      fontSize: 18
   },

   input: {
      flex: 1,
      borderRadius: 5,
      padding: 15,
      margin: 10,
      fontWeight: "500",
      fontSize: 16,
      color: "rgb(90,90,90)"
   }
});
