import React, { Component } from "react";
import {
   Text,
   View,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   Dimensions,
   LayoutAnimation
} from "react-native";
import { loadActions } from "../store/actions/firstActions";
import { connect } from "react-redux";

const Layout = {
   window: {
      width: Dimensions.get("window").width
   }
};
const SearchContainerHorizontalMargin = 10;
const SearchContainerWidth =
   Layout.window.width - SearchContainerHorizontalMargin * 2;

class SearchBar extends React.PureComponent {
   state = {
      text: "",
      showCancelButton: false,
      inputWidth: SearchContainerWidth
   };

   _textInput: TextInput;

   componentDidMount() {
      requestAnimationFrame(() => {
         this._textInput.focus();
      });
   }

   _handleLayoutCancelButton = (e: Object) => {
      if (this.state.showCancelButton) {
         return;
      }

      const cancelButtonWidth = e.nativeEvent.layout.width;

      requestAnimationFrame(() => {
         LayoutAnimation.configureNext({
            duration: 200,
            create: {
               type: LayoutAnimation.Types.linear,
               property: LayoutAnimation.Properties.opacity
            },
            update: {
               type: LayoutAnimation.Types.spring,
               springDamping: 0.9,
               initialVelocity: 10
            }
         });

         this.setState({
            showCancelButton: true,
            inputWidth: SearchContainerWidth - cancelButtonWidth
         });
      });
   };

   render() {
      let { inputWidth, showCancelButton } = this.state;
      let searchInputStyle = {};
      if (this.props.textColor) {
         searchInputStyle.color = this.props.textColor;
      }

      return (
         <View style={styles.container}>
            <View style={[styles.searchContainer, { width: inputWidth }]}>
               <TextInput
                  ref={view => {
                     this._textInput = view;
                  }}
                  clearButtonMode="while-editing"
                  onChangeText={this._handleChangeText}
                  value={this.state.text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                  placeholder="Категории и названия"
                  placeholderTextColor={
                     this.props.placeholderTextColor || "#ccc"
                  }
                  onSubmitEditing={this._handleSubmit}
                  style={[styles.searchInput, searchInputStyle]}
               />
            </View>

            <View
               key={
                  showCancelButton
                     ? "visible-cancel-button"
                     : "layout-only-cancel-button"
               }
               style={[
                  styles.buttonContainer,
                  { opacity: showCancelButton ? 1 : 0 }
               ]}
            >
               <TouchableOpacity
                  style={styles.button}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 20 }}
                  onLayout={this._handleLayoutCancelButton}
                  onPress={this._handlePressCancelButton}
               >
                  <Text
                     style={{
                        fontSize: 17,
                        color: this.props.tintColor || "#007AFF"
                     }}
                  >
                     Отмена
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }

   _handleChangeText = text => {
      this.setState({ text });
      this.props.onChangeQuery && this.props.onChangeQuery(text);
   };

   _handleSubmit = () => {
      let { text } = this.state;
      this.props.onSubmit && this.props.onSubmit(text);
      this._textInput.blur();
   };

   _handlePressCancelButton = () => {
      if (this.props.onCancelPress) {
         this.props.onCancelPress(this.props.navigation.goBack);
      } else {
         this.props.navigation.goBack();
      }
   };
}

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      paddingTop: 25
   },
   buttonContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      paddingTop: 42,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
   },
   button: {
      paddingRight: 17,
      paddingLeft: 2
   },
   searchContainer: {
      height: 34,
      width: SearchContainerWidth,
      backgroundColor: "#f2f2f2",
      borderRadius: 5,
      marginHorizontal: SearchContainerHorizontalMargin,
      marginTop: 10,
      paddingLeft: 10
   },

   searchInput: {
      flex: 1,
      fontSize: 16,
      paddingTop: 1
   }
});

export default connect(
   undefined,
   { toggle: loadActions.toggle }
)(SearchBar);
