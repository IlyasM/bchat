import React, { Component } from "react";
import {
   ScrollView,
   View,
   Image,
   TouchableWithoutFeedback,
   Text,
   LayoutAnimation,
   Dimensions
} from "react-native";
import { bizList } from "../fake-data";
import FadeIn from "./fadeImage";
const windowD = Dimensions.get("window");
export default class ZoomView extends Component {
   state = { loaded: false };
   static defaultProps = {
      doAnimateZoomReset: false,
      maximumZoomScale: 2,
      minimumZoomScale: 1,
      zoomHeight: windowD.height,
      zoomWidth: windowD.width,
      source: {
         uri: bizList[0].image.uri
      }
   };
   handleResetZoomScale = event => {
      this.scrollResponderRef.scrollResponderZoomTo({
         x: 0,
         y: 0,
         width: this.props.zoomWidth,
         height: this.props.zoomHeight,
         animated: true
      });
   };
   setZoomRef = node => {
      //the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
      if (node) {
         this.zoomRef = node;
         this.scrollResponderRef = this.zoomRef.getScrollResponder();
      }
   };
   onLoad = () => {
      requestAnimationFrame(() => {
         LayoutAnimation.easeInEaseOut();
         this.setState({ loaded: true });
      });
   };
   componentDidMount() {
      Image.getSize(
         this.props.source.uri,
         (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get("window").height; // or something else
            const maxWidth = Dimensions.get("window").width;

            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            requestAnimationFrame(() => {
               this.setState({
                  width: srcWidth * ratio,
                  height: srcHeight * ratio
               });
            });
         },
         error => {
            console.log("error:", error);
         }
      );
   }
   render() {
      let source = this.props.navigation.getParam("image");
      return (
         <View
            style={{
               flex: 1
            }}
         >
            <ScrollView
               contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center"
               }}
               centerContent
               maximumZoomScale={this.props.maximumZoomScale}
               minimumZoomScale={this.props.minimumZoomScale}
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               ref={this.setZoomRef}
               style={{ overflow: "hidden" }}
            >
               <TouchableWithoutFeedback
                  style={{ flex: 1 }}
                  onPress={this.handleResetZoomScale}
               >
                  <Image
                     onLoad={this.onLoad}
                     mode="contain"
                     style={{
                        width: this.state.width,
                        height: this.state.height
                     }}
                     source={source}
                  />
               </TouchableWithoutFeedback>
               {!this.state.loaded && (
                  <View style={{ justifyContent: "center" }}>
                     <Text style={{ color: "white" }}>Загрузка...</Text>
                  </View>
               )}
            </ScrollView>
         </View>
      );
   }
}
