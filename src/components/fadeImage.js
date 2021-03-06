import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  View,
  Image,
  Animated,
  LayoutAnimation
} from "react-native"
import randomColor from "randomcolor"
export default class FadeImage extends Component {
  state = {
    opacity: new Animated.Value(0)
  }
  static hasBeenLoaded = false
  // componentDidMount() {
  //    this.color = randomColor({ luminosity: "light" });
  // }
  _onLoad = () => {
    requestAnimationFrame(() => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    })
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    const color = randomColor()
    return (
      <View style={this.props.style}>
        <Animated.Image
          onLoad={this._onLoad}
          source={{ uri: this.props.uri }}
          style={[
            {
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1]
                  })
                }
              ]
            },
            this.props.style
          ]}
        />
        <Animated.View
          style={[
            styles.placeholder,
            {
              backgroundColor: color,
              opacity: this.state.opacity.interpolate({
                inputRange: [0, 0.5],
                outputRange: [1, 0]
              })
            },
            this.props.style
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  placeholder: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    color: "rgb(50,50,50)"
  }
})
