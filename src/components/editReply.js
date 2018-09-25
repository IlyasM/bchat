import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TextInput,
   Alert,
   TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
export default class EditReply extends Component {
   state = { text: "Да я смогу Вам помочь. " };
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
      const { action, item } = this.props.navigation.state.params;
      action(item, this.state.text);
      this.delayGoBack();
      Alert.alert(
         "Ваш ответ поступил",
         "Пользователь возможно вам напишет",
         [{ text: "OK", onPress: null }],
         { cancelable: false }
      );
   };
   render() {
      const { action, item } = this.props.navigation.state.params;
      return (
         <View style={styles.container}>
            <TextInput
               ref={view => {
                  this._textInput = view;
               }}
               // selectTextOnFocus={this.state.flag}
               style={[styles.textInput]}
               value={this.state.text}
               onChangeText={this._onChangeText}
               placeholder="Напишите свой ответ."
               multiline
            />
            <View style={styles.buttonContainer}>
               <View>
                  <TouchableOpacity onPress={this.send} style={styles.send}>
                     <Text style={styles.sendText}>Отправить</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <TouchableOpacity
               onPress={() => this.props.navigation.goBack()}
               style={styles.close}
            >
               <Icon name="ios-close" color={"rgb(100,100,100)"} size={40} />
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 60
   },
   buttonContainer: {
      flex: 1,
      marginBottom: 264,
      justifyContent: "center",
      alignItems: "center"
   },
   close: {
      position: "absolute",
      top: 35,
      right: 20,
      padding: 5
   },
   send: {
      backgroundColor: Colors.tintColor,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 5
   },
   sendText: {
      color: "white",
      fontWeight: "500"
   },
   textInput: {
      flex: 1,
      margin: 16,
      fontWeight: "500",
      fontSize: 18,
      height: 200,
      color: "rgb(90,90,90)"
   }
});
