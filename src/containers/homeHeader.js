import React, { Component } from "react";
import { Text, View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { loadActions } from "../store/actions/firstActions";
import { connect } from "react-redux";
class HomeHeader extends Component {
   state = {
      selectedIndex: 0
   };
   updateIndex = selectedIndex => {
      this.setState({ selectedIndex }, () => this.props.toggle(selectedIndex));
   };

   render() {
      const buttons = ["Все", "Онлайн"];

      return (
         <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 30, width: 200 }}
         />
      );
   }
}
export default connect(
   undefined,
   { toggle: loadActions.toggle }
)(HomeHeader);
