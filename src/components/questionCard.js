import React, { PureComponent } from "react";
import {
   Text,
   View,
   FlatList,
   StyleSheet,
   Switch,
   Dimensions
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import ResponseList from "../containers/responseList";
import Separator from "../components/separator";
import { connect } from "react-redux";
class QuestionCard extends PureComponent {
   toggle = () => {
      this.props.toggle(this.props.item, !this.props.item.active);
   };
   render() {
      const { category, text, active, replies } = this.props.item;
      return (
         <View style={styles.root}>
            <View style={styles.row}>
               <Text style={styles.categoryText}>
                  {category.name.toUpperCase()}
               </Text>
               <Switch onValueChange={this.toggle} value={active} />
            </View>
            <View
               style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "rgb(200,200,200)"
               }}
            >
               <Text style={styles.text}>{text}</Text>
            </View>
            <ResponseList
               isActive={active}
               navigation={this.props.navigation}
               data={replies}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      margin: 10,
      padding: 8,
      width: WIDTH - 20,
      // height: HEIGHT - 140,
      backgroundColor: "white",
      borderRadius: 5
   },
   row: {
      alignItems: "center",
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between"
   },
   categoryText: { color: "rgb(120,120,120)", fontFamily: "bebas" },
   text: { fontSize: 16, paddingTop: 8, marginBottom: 14 }
});
const mapState = (state, props) => {
   return { item: state.data.broadcasts.byIds[props.broadcastId] };
};

export default connect(mapState)(QuestionCard);
