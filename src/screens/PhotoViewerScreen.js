import React from "react";
import {
   Image,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   View,
   StatusBar
} from "react-native";

import Immutable from "immutable";
import ImageGallery, {
   openImageGallery
} from "@expo/react-native-image-gallery";
import { bizList } from "../fake-data";
class ListItem extends React.Component {
   _openInImageGallery = () => {
      let { item } = this.props;

      this._view.measure((rx, ry, w, h, x, y) => {
         openImageGallery({
            animationMeasurements: { w, h, x, y },
            list,
            item
         });
      });
   };

   render() {
      let { list, item } = this.props;

      let { width, height } = item;

      let targetWidth = 150.0;
      let multiplier = targetWidth / width;
      let targetHeight = multiplier * height;

      return (
         <TouchableWithoutFeedback onPress={this._openInImageGallery}>
            <Image
               ref={view => {
                  this._view = view;
               }}
               source={{ uri: item.imageUrl }}
               style={{
                  width: targetWidth,
                  height: targetHeight,
                  marginBottom: 20
               }}
            />
         </TouchableWithoutFeedback>
      );
   }
}

class FakeContent extends React.Component {
   render() {
      return (
         <View
            style={{
               flex: 1,
               paddingTop: 40,
               paddingBottom: Platform.OS === "android" ? 10 : 0
            }}
         >
            <View
               style={{
                  paddingBottom: 10,
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                  alignItems: "center"
               }}
            >
               <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  My favourite brewery
               </Text>
            </View>

            <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}
            >
               {list.map(item => (
                  <ListItem key={item.imageUrl} item={item} />
               ))}
            </ScrollView>
         </View>
      );
   }
}

export default class App extends React.Component {
   render() {
      return (
         <View style={{ flex: 1 }}>
            <View style={styles.container}>
               <FakeContent />
            </View>

            <ImageGallery />
            <StatusBar barStyle="default" />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
   },
   instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5
   }
});

const list = [
   {
      description: ":O hat etc",
      imageUrl: bizList[0].image.uri,
      width: 480,
      height: 480
   },
   {
      imageUrl: bizList[1].image.uri,
      description: "wood",
      width: 640,
      height: 640
   },
   {
      imageUrl: bizList[2].image.uri,
      description: "making beer etc",
      width: 640,
      height: 640
   }
];
