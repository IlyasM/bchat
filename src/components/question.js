import React, { PureComponent } from "react";
import {
   Button,
   StyleSheet,
   View,
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
            <TextInput
               ref={el => (this.ti = el)}
               clearButtonMode="while-editing"
               onChangeText={this._onChangeText}
               // value={this.props.query}
               placeholder="Отфильтровать категории"
               autoCapitalize={"none"}
               placeholderTextColor={"rgb(180, 180, 180)"}
               style={[styles.textInput, { width: textInputWidth }]}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      alignItems: "center",
      flexDirection: "row"
   },
   textInput: {
      height: 30,
      backgroundColor: "rgb(240,240,240)",
      margin: 10,
      paddingLeft: 10
   }
});
