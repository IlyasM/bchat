import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native"
import Chooser from "../components/tagChooser"
import Search from "../components/searchInput"
import { connect } from "react-redux"
import { actions } from "../store/actions/filter"
import ProfileIcon from "../containers/profileIcon"
import Loading from "../components/Loading"
import { getFilteredCategories } from "../store/reducers/filter"
class Create extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Я ищу",
      headerRight: <ProfileIcon navigation={navigation} />
    }
  }
  // componentDidMount() {
  //   this.props.navigation.addListener("willFocus", route => {
  //     this.search.focus()
  //   })
  // }
  componentWillUnmount() {
    this.props.navigation.removeListener("willFocus")
  }
  state = { text: "" }
  _onChangeText = text => {
    this.props.search(text.trim())
  }
  onTagPress = category => {
    this.props.navigation.navigate("CreateWish", { category })
  }
  render() {
    console.log(this.props.categories)
    return (
      <View style={styles.container}>
        <Search
          ref={el => (this.search = el)}
          query={this.props.query}
          search={this.props.search}
        />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
          <ScrollView keyboardShouldPersistTaps="always">
            <Chooser
              onPress={this.onTagPress}
              navigation={this.props.navigation}
              categories={this.props.categories}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  textInput: { height: 30, width: 200, paddingLeft: 10 }
})
const mapStateToProps = state => {
  return {
    categories: getFilteredCategories(state),
    query: state.filter.query
    // loading: state.identity.loading
  }
}
const mapDispatchToProps = { search: actions.filter }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)
