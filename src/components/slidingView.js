import React, { Component } from "react";
import {
   Animated,
   StyleSheet,
   View,
   Dimensions,
   Text,
   TouchableOpacity
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class SearchView extends Component {
   state = {
      xcoor: new Animated.Value(0)
   };
   animate = () => {
      Animated.timing(this.state.xcoor, {
         toValue: WIDTH,
         duration: 300,
         useNativeDriver: true
      }).start();
   };

   render() {
      return (
         <Animated.View
            style={[
               {
                  transform: [
                     {
                        translateX: this.state.xcoor
                     }
                     // { scale: this.state.xcoor }
                  ]
               },
               styles.root
            ]}
         >
            <TouchableOpacity onPress={this.animate}>
               <Text>press</Text>{" "}
            </TouchableOpacity>
         </Animated.View>
      );
   }
}
const styles = StyleSheet.create({
   root: { flex: 1, backgroundColor: "blue" }
});
