import React from "react";
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   LayoutAnimation,
   Image,
   KeyboardAvoidingView,
   StatusBar,
   NativeModules,
   ActivityIndicator
} from "react-native";
const { StatusBarManager } = NativeModules;
import StatusBarHeight from "@expo/status-bar-height";
import MessageItem from "../components/messageItem";
import MessageInput from "../components/messageInput";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import Loading from "../components/Loading";
import BusinessCard from "../components/businessCard";
class Messages extends React.Component {
   state = { statusHeight: 20 };
   statusHeightChange = height => {
      this.setState({ statusHeight: height });
   };
   componentWillMount() {
      StatusBarManager.getHeight(statusBarHeight => {
         requestAnimationFrame(() => {
            this.setState({ statusHeight: statusBarHeight.height });
         });
      });
      // StatusBarHeight.addEventListener(this.statusHeightChange);
   }
   componentWillUnmount() {
      // StatusBarHeight.removeEventListener(this.statusHeightChange);
   }

   componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
   }

   renderItem = ({ item }) => {
      const next = this.props.items.filter(i => i.order === item.order - 1)[0];

      return (
         <MessageItem
            navigation={this.props.navigation}
            item={item}
            next={next}
         />
      );
   };
   renderEmpty = () => null;

   renderFooter = () => {
      if (!this.props.loading) return null;

      return (
         <View
            style={{
               paddingVertical: 20
            }}
         >
            <Loading />
         </View>
      );
   };

   render() {
      const { items, loading } = this.props;
      return (
         <KeyboardAvoidingView
            keyboardVerticalOffset={this.state.statusHeight > 20 ? 84 : 64}
            behavior="padding"
            style={styles.root}
         >
            <FlatList
               data={items}
               renderItem={this.renderItem}
               inverted
               style={{ paddingVertical: 10 }}
               // refreshing={this.state.isRefreshing}
               // keyboardDismissMode="on-drag"
               removeClippedSubviews
               windowSize={31}
               onRefresh={this.handleRefresh}
               onEndReached={this.handleLoadMore}
               onEndThreshold={0}
               keyExtractor={i => i.id}
               scrollsToTop={false}
               ListFooterComponent={this.renderFooter}
               EmptyListComponent={() => this.renderEmpty()}
            />
            <MessageInput lastMessageId={this.props.items.length - 1} />
         </KeyboardAvoidingView>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      backgroundColor: Colors.lightBlue,
      flex: 1,
      justifyContent: "space-between"
   }
});

const mapStateToProps = state => ({
   items: state.messages.items,
   loading: state.messages.loading
});

export default connect(mapStateToProps)(Messages);
