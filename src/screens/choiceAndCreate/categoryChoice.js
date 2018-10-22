import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native"
import Chooser from "../../components/tagChooser"
import Search from "../../components/searchInput"
import { connect } from "react-redux"
import { actions as biz } from "../../store/actions/entities"
import { actions as filter } from "../../store/actions/filter"
import Loading from "../../components/Loading"
import { categories } from "../../fake-data"
class CategoryChoice extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Выберите категорию"
    }
  }
  componentWillMount() {
    this.props.getCategories()
    // this.props.afterJoin({ categories })
  }

  onTagPress = category => {
    this.props.setCategory(category)
    this.props.navigation.navigate("CreateBusiness")
  }

  render() {
    return (
      <View style={styles.container}>
        <Search
          ref={el => (this.search = el)}
          query={this.props.query}
          search={this.props.filter}
        />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
          {this.props.loading ? (
            <Loading />
          ) : (
            <ScrollView keyboardShouldPersistTaps="always">
              <Chooser
                onPress={this.onTagPress}
                navigation={this.props.navigation}
                categories={this.props.categories}
              />
            </ScrollView>
          )}
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
    categories: state.filter.results,
    query: state.filter.query,
    loading: state.identity.loading
  }
}
const mapDispatch = { ...filter, ...biz }
export default connect(
  mapStateToProps,
  mapDispatch
)(CategoryChoice)
