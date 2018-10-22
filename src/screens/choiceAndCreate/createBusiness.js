import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Back from "../../components/backArrow"
import BusinessEdit from "../../components/businessEdit"
import Form from "../../components/formikForm"
import BizForm from "../../components/BusinessCreateForm"
export default class componentName extends Component {
  static navigationOptions = {
    title: "Создать бизнес",
    headerBackImage: <Back />
  }
  render() {
    return <BizForm navigation={this.props.navigation} />
  }
}
