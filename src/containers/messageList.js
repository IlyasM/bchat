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
import { actions as messaging } from "../store/actions/messaging";
import Colors from "../constants/Colors";
import Loading from "../components/Loading";
import BusinessCard from "../components/businessCard";
import { DangerZone } from "expo";
const { Localization } = DangerZone;
class Messages extends React.Component {
   state = { statusHeight: 20, currentTimeZone: null };
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
   async componentDidMount() {
      this.props.setRoute(this.props.to);
   }

   componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
   }
   componentWillUnmount() {
      this.props.setRoute();
   }

   renderItem = ({ item, index }) => {
      const previous = this.props.chat.events[index - 1];

      return (
         <MessageItem
            navigation={this.props.navigation}
            item={item}
            timeZone={this.state.currentTimeZone}
            previous={previous}
            myId={this.props.myId}
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
      let { loading, to, chat, push, myId, typing, entity } = this.props;

      // console.log("in render", chat);
      return (
         <KeyboardAvoidingView
            keyboardVerticalOffset={this.state.statusHeight > 20 ? 84 : 64}
            behavior="padding"
            style={styles.root}
         >
            <FlatList
               data={chat.events}
               renderItem={this.renderItem}
               inverted
               contentContainerStyle={{ paddingBottom: 10 }}
               // refreshing={this.state.isRefreshing}
               // keyboardDismissMode="on-drag"
               removeClippedSubviews
               windowSize={31}
               onRefresh={this.handleRefresh}
               onEndReached={this.handleLoadMore}
               onEndThreshold={0}
               keyExtractor={i => `${i.id}`}
               scrollsToTop={false}
               ListFooterComponent={this.renderFooter}
               EmptyListComponent={() => this.renderEmpty()}
            />
            {chat.typing && (
               <Text style={{ margin: 20, color: "rgb(150,150,150)" }}>
                  typing....
               </Text>
            )}
            <MessageInput myId={myId} to={to} push={push} typing={typing} />
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

const mapStateToProps = (state, props) => {
   return {
      chat: state.data.chats.byIds[props.to],
      myId: state.identity.myId
   };
};
const mapDispatch = {
   setRoute: messaging.setRoute,
   push: messaging.pushMsg,
   typing: messaging.pushTyping
};

export default connect(
   mapStateToProps,
   mapDispatch
)(Messages);
