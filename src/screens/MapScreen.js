import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
const WIDTH = Dimensions.get("window").width;
import Back from "../components/backArrow";
export class MapScreen extends Component {
   static navigationOptions = {
      title: "Карта",
      headerBackImage: <Back />
   };
   render() {
      return (
         <View style={{ flex: 1 }}>
            <MapView
               style={{ flex: 1 }}
               initialRegion={{
                  latitude: 43.222,
                  longitude: 76.8512,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
               }}
            >
               <Marker
                  title="mehaha"
                  coordinate={{
                     latitude: 43.222,
                     longitude: 76.8512
                  }}
               />
            </MapView>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      height: 50,
      width: WIDTH,
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
   }
});

export default MapScreen;
