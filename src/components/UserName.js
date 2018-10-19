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
import { connect } from "react-redux";
import { actions } from "../store/actions/auth";
import MaterialTextInput from "./MaterialTextInput";
import FullButton from "../components/fullButton";

const field = {
   name: "name",
   label: "Как Вас зовут?"
};

class UserName extends Component {
   state = {
      name: { value: "", touched: false }
   };

   _onChangeText = text => {
      this.setState({
         name: { ...this.state.name, value: text }
      });
   };

   onSubmit = () => {
      if (this.state.name.value.trim() === "") {
         this.setState({
            name: { value: "", touched: true }
         });
         return;
      }
      console.log("success", this.state);
   };
   render() {
      // const { action, item } = navigation.state.params;
      return (
         <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
               <MaterialTextInput
                  touched
                  error={
                     this.state.name.touched &&
                     this.state.name.value.trim() === ""
                        ? `Необходимо заполнить`
                        : ""
                  }
                  onChangeText={this._onChangeText}
                  {...field}
               />
            </ScrollView>
            <FullButton text="Далее" onPress={this.onSubmit} />
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
)(UserName);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white"
   }
});
