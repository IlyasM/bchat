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
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { actions } from "../../store/actions/auth";
const HEIGHT = Dimensions.get("window").height;
class EnterEmail extends Component {
   static defaultProps = {
      text: "",
      placeholderText: "john.doe@gmail.com",
      buttonText: "Далее",
      title: "Введите Ваш email"
   };
   static navigationOptions = {
      title: "Добро пожаловать!"
   };
   state = { text: this.props.text, errorText: "" };
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
   validate = text => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return reg.test(text);
   };
   send = () => {
      const text = this.state.text.trim().toLowerCase();
      if (!this.validate(text)) {
         this.setState({ errorText: "Неправильный формат email" });
         return;
      } else {
         this.setState({ errorText: "" });
      }
      this.props.register(text);
   };
   render() {
      const { buttonText, placeholderText, title, navigation } = this.props;
      // const { action, item } = navigation.state.params;

      return (
         <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{ flex: 1 }}>
               <Text style={styles.title}>{title}</Text>
               <View style={{ flex: 1 }}>
                  <TextInput
                     ref={view => {
                        this._textInput = view;
                     }}
                     clearButtonMode="while-editing"
                     keyboardType="email-address"
                     style={[styles.input]}
                     value={this.state.text}
                     onChangeText={this._onChangeText}
                     placeholder={placeholderText}
                  />
               </View>
               <Text style={{ color: "red", margin: 15 }}>
                  {this.state.errorText}
               </Text>

               <TouchableOpacity onPress={this.send} style={styles.send}>
                  <Text style={styles.sendText}>{buttonText}</Text>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      );
   }
}
const mapState = state => {
   return {};
};
export default connect(
   mapState,
   actions
)(EnterEmail);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   },
   buttonContainer: {
      justifyContent: "center",
      alignItems: "center"
   },
   title: {
      margin: 10,
      marginLeft: 20,
      fontSize: 16,
      color: "rgb(70,70,70)"
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
      borderRadius: 5,
      padding: 15,
      margin: 5,
      fontWeight: "500",
      fontSize: 17,
      color: "rgb(90,90,90)"
   }
});
