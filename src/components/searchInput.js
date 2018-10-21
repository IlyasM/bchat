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
export default class SearchInput extends PureComponent {
   state = { textInputWidth: WIDTH, focused: this.props.query !== "" };
   _onChangeText = (text, toBlur) => {
      if (toBlur) {
         this.setState({ textInputWidth: WIDTH, focused: false });
      }
      this.props.search(text.trim());
   };
   _onFocus = () => {
      requestAnimationFrame(() => {
         LayoutAnimation.easeInEaseOut();
         this.setState({ focused: true, textInputWidth: WIDTH - 100 });
      });
   };
   _onBlur = () => {
      if (this.props.query === "") this._onChangeText("", true);
   };
   focus=()=>{
    this.ti.focus()
   }

   render() {
      const { textInputWidth, text, focused } = this.state;
      return (
         <View style={styles.container}>
            <TextInput
               ref={el => (this.ti = el)}
               clearButtonMode="while-editing"
               onFocus={this._onFocus}
               onBlur={this._onBlur}
               onChangeText={this._onChangeText}
               value={this.props.query}
               placeholder="Отфильтровать категории"
               autoCapitalize={"none"}
               placeholderTextColor={"rgb(180, 180, 180)"}
               style={[styles.textInput, { width: textInputWidth }]}
            />
            {focused && <Button onPress={this.onPress} title={"Отмена"} />}
         </View>
      );
   }

   onPress = () => {
      this._onChangeText("", true);
      this.ti.blur();
   };
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
