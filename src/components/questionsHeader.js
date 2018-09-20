import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Separator from "./separator";
export class componentName extends PureComponent {
   state = {
      selectedIndex: 0
   };
   updateIndex = selectedIndex => {
      this.setState({ selectedIndex });
   };
   render() {
      return (
         <View style={styles.header}>
            <Text style={styles.headerText}>Мои запросы</Text>
            <ButtonGroup
               onPress={this.updateIndex}
               selectedIndex={this.state.selectedIndex}
               buttons={["Активные", "Неактивные"]}
               containerStyle={{ height: 30, marginBottom: 10 }}
            />
            <Separator full />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   root: { flex: 1 },
   header: { alignItems: "center", backgroundColor: "white" },
   headerText: {
      margin: 8,
      fontSize: 17,
      fontWeight: "600"
   }
});
export default componentName;
