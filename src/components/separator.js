import React, { Component } from "react";
import { Dimensions, View } from "react-native";
const WIDTH = Dimensions.get("window").width;

export default class componentName extends Component {
   render() {
      return (
         <View
            style={{
               height: 0.5,
               width: WIDTH / 1.2,
               marginLeft: 60,
               backgroundColor: "rgb(200,200,200)"
            }}
         />
      );
   }
}
