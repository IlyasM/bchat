import React, { PureComponent } from "react";
import { Dimensions, View } from "react-native";
const WIDTH = Dimensions.get("window").width;

export default class componentName extends PureComponent {
   render() {
      return (
         <View
            style={{
               height: 0.5,
               width: this.props.full ? WIDTH : WIDTH / 1.2,
               marginLeft: this.props.full ? 0 : 60,
               backgroundColor: "rgb(200,200,200)"
            }}
         />
      );
   }
}
