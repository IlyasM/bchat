import React, { PureComponent } from "react";
import { Text, View, StyleSheet, LayoutAnimation } from "react-native";
import Tag from "./tag";
import { cap } from "../constants/utils";
import { categories } from "../fake-data";
export class Chooser extends PureComponent {
   static defaultProps = {
      onPress: category => {
         requestAnimationFrame(() => {
            this.props.navigation.navigate("CreateWish", {
               category
            });
         });
      },
      categories: categories
   };
   componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
   }
   render() {
      if (this.props.categories && this.props.categories.length < 1) {
         return (
            <View
               style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100
               }}
            >
               <Text>Ничего не найдено</Text>
            </View>
         );
      }
      return (
         <View style={styles.root}>
            {this.props.categories.map((category, i) => {
               const onPress = () => {
                  this.props.onPress(category);
               };
               return <Tag onPress={onPress} key={i} name={category.name} />;
            })}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }
});

export default Chooser;
