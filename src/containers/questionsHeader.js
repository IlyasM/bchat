import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Separator from "../components/separator";
import { connect } from "react-redux";
import { actions } from "../store/actions/broadcast";
export class componentName extends PureComponent {
   updateIndex = selectedIndex => {
      this.props.toggle(selectedIndex === 0);
   };
   render() {
      return (
         <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.props.isActive ? 0 : 1}
            buttons={["Активные", "Неактивные"]}
            containerStyle={{ height: 30, width: 240 }}
         />
      );
   }
}
const styles = StyleSheet.create({
   root: { flex: 1 },
   header: { alignItems: "center", backgroundColor: "white" }
});

export default connect(
   state => ({
      isActive: state.broadcast.activeTab
   }),
   { toggle: actions.broadcastTabToggle }
)(componentName);
