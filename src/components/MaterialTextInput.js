// MaterialTextInput.js
import React from "react"
import { Text, View } from "react-native"
import { TextField } from "react-native-material-textfield"

export default class MaterialTextInput extends React.Component {
  focus() {
    this.input.focus()
  }
  shouldComponentUpdate(nextProps) {
    const { error, touched, value } = this.props
    return (
      error !== nextProps.error ||
      touched !== nextProps.touched ||
      value !== nextProps.value
    )
  }

  render() {
    const { error, touched, ...props } = this.props
    const displayError = !!error && touched
    const errorColor = "rgb(239, 51, 64)"
    return (
      <View>
        <TextField
          ref={input => (this.input = input)}
          labelHeight={12}
          baseColor={displayError ? errorColor : "#1976D2"}
          tintColor="#2196F3"
          textColor="#212121"
          {...props}
        />
        <Text
          style={{
            textAlign: "right",
            color: displayError ? errorColor : "transparent",
            height: 20
          }}
        >
          {error}
        </Text>
      </View>
    )
  }
}
