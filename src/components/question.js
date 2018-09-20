import React, { PureComponent } from "react";
import {
   Button,
   StyleSheet,
   View,
   Text,
   TextInput,
   Dimensions,
   LayoutAnimation
} from "react-native";
const WIDTH = Dimensions.get("window").width - 20;
export default class Question extends PureComponent {
   state = { textInputWidth: WIDTH };
   _onChangeText = text => {};

   render() {
      const { textInputWidth, text, focused } = this.state;
      return (
         <View style={styles.container}>
            <Text style={styles.text}>
               Отправьте запрос и ожидайте отклика. Либо, выберите одного и
               напишите сразу.
            </Text>
            <TextInput
               ref={el => (this.ti = el)}
               clearButtonMode="while-editing"
               onChangeText={this._onChangeText}
               // value={this.props.query}
               multiline
               placeholder={this.props.category.question}
               autoCapitalize={"none"}
               placeholderTextColor={"rgb(180, 180, 180)"}
               style={[styles.textInput]}
            />
            <Button onPress={this.props.broadcast} title={"Отправить"} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      alignItems: "center",
      borderBottomWidth: 0.5,
      padding: 10,
      paddingBottom: 2,
      borderBottomColor: "rgb(200,200,200)"
   },
   text: { marginBottom: 7, color: "rgb(90,90,90)", fontSize: 15 },
   textInput: {
      height: 48,
      fontSize: 15,
      backgroundColor: "rgb(240,240,240)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: WIDTH
   }
});
