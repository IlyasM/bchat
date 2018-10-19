import React, { Component } from "react";
import {
   StyleSheet,
   ScrollView,
   View,
   KeyboardAvoidingView
} from "react-native";
import { RaisedTextButton } from "react-native-material-buttons";
import { TextField } from "react-native-material-textfield";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import TagChooser from "../components/tagChooser";

export default class Example extends Component {
   constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.onSubmitName = this.onSubmitName.bind(this);
      this.onSubmitShort = this.onSubmitShort.bind(this);

      this.nameRef = this.updateRef.bind(this, "name");
      this.shortRef = this.updateRef.bind(this, "short");
      this.longRef = this.updateRef.bind(this, "long");

      this.state = {
         name: "",
         short: "",
         long: ""
      };
   }

   onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
         let ref = this[name];

         if (ref && ref.isFocused()) {
            delete errors[name];
         }
      }

      this.setState({ errors });
   }

   onChangeText(text) {
      ["name", "short", "long", "email"]
         .map(name => ({ name, ref: this[name] }))
         .forEach(({ name, ref }) => {
            console.log(name, ref);
            if (ref.isFocused()) {
               this.setState({ [name]: text });
            }
         });
   }

   onSubmitName() {
      this.short.focus();
   }

   onSubmitShort() {
      this.long.focus();
   }

   onSubmit() {
      let errors = {};
      console.log("submittin");
      ["name", "short", "long"].forEach(name => {
         console.log(name, this[name]);
         let value = this[name].value();

         if (!value) {
            errors[name] = "Should not be empty";
         }
      });

      this.setState({ errors });
   }

   updateRef(name, ref) {
      this[name] = ref;
   }

   render() {
      let { errors = {}, ...data } = this.state;
      let { name = "name", short = "house", long = "long" } = data;

      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView
               style={styles.scroll}
               contentContainerStyle={styles.contentContainer}
               keyboardShouldPersistTaps="handled"
            >
               <View style={styles.container}>
                  <TextField
                     ref={this.nameRef}
                     value={data.name}
                     autoCorrect={false}
                     enablesReturnKeyAutomatically={true}
                     onFocus={this.onFocus}
                     onChangeText={this.onChangeText}
                     onSubmitEditing={this.onSubmitName}
                     returnKeyType="next"
                     label="Название"
                     error={errors.name}
                  />

                  <TextField
                     ref={this.shortRef}
                     value={data.short}
                     autoCorrect={false}
                     enablesReturnKeyAutomatically={true}
                     onFocus={this.onFocus}
                     onChangeText={this.onChangeText}
                     onSubmitEditing={this.onSubmitShort}
                     returnKeyType="next"
                     label="Краткое описание"
                     error={errors.short}
                  />

                  <TextField
                     ref={this.longRef}
                     value={data.long}
                     onFocus={this.onFocus}
                     onChangeText={this.onChangeText}
                     returnKeyType="next"
                     multiline={true}
                     blurOnSubmit={true}
                     label="Подробное описание"
                     characterRestriction={240}
                  />
                  <TextField
                     ref={this.longRef}
                     value={data.long}
                     onFocus={this.onFocus}
                     onChangeText={this.onChangeText}
                     returnKeyType="next"
                     multiline={true}
                     blurOnSubmit={true}
                     label="Подробное описание"
                     characterRestriction={240}
                  />
               </View>

               <View style={styles.container}>
                  <RaisedTextButton
                     onPress={this.onSubmit}
                     title="создать"
                     color={TextField.defaultProps.tintColor}
                     titleColor="white"
                  />
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      );
   }
}

const styles = StyleSheet.create({
   scroll: {
      backgroundColor: "white"
   },

   container: {
      margin: 8,
      marginTop: 24
   },

   contentContainer: {
      padding: 8
   }
});
