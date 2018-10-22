import React, { Component } from "react"
import { Text, View, StyleSheet } from "react-native"
import UserName from "../../components/UserName"
import Back from "../../components/backArrow"
export default class componentName extends Component {
  static navigationOptions = {
    title: "Введите имя",
    headerBackImage: <Back />
  }
  render() {
    return <UserName navigation={this.props.navigation} />
  }
}
const styles = StyleSheet.create({})
