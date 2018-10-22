import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import { actions } from "../store/actions/entities"
import MaterialTextInput from "./MaterialTextInput"
import FullButton from "../components/fullButton"
const fields = [
  { name: "name", label: "Название" },
  { name: "short", label: "Краткое описание" },
  { name: "phone", label: "Телефон" }
]
const long = {
  name: "long",
  label: "Более подробно о Вас. Адрес, время работы и т.д"
}

class BizCreate extends Component {
  state = {
    selected: null,
    name: { value: "", touched: false },
    short: { value: "", touched: false },
    long: { value: "", touched: false },
    phone: { value: "", touched: false }
  }

  _onChangeText = text => {
    const selected = this.state.selected
    this.setState({
      [selected]: { ...this.state[selected], value: text }
    })
  }
  onFocus = name => {
    requestAnimationFrame(() => {
      this.setState(state => {
        return {
          selected: name,
          [name]: { ...state[name], touched: true }
        }
      })
    })
  }
  onSubmit = () => {
    const emptyFields = fields
      .map(field => ({
        ...field,
        ...this.state[field.name]
      }))
      .filter(field => field.value.trim() === "")
    if (emptyFields.length > 0) {
      emptyFields.forEach(field =>
        this.setState({
          [field.name]: { ...this.state[field.name], touched: true }
        })
      )
      return
    }
    const business = {
      category_id: this.props.category.id,
      name: this.state.name.value.trim(),
      short: this.state.short.value.trim(),
      long: this.state.long.value.trim(),
      phone: this.state.phone.value.trim()
    }
    this.props.createBusiness(business, this.props.navigation)
  }
  render() {
    console.log("render form")
    // const { action, item } = navigation.state.params;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            #{this.props.category.name.toLowerCase()}
          </Text>
          {fields.map(field => (
            <MaterialTextInput
              keyboardType={field.name === "phone" ? "number-pad" : "default"}
              touched
              error={
                this.state[field.name].touched &&
                this.state[field.name].value.trim() === ""
                  ? `Необходимо заполнить`
                  : ""
              }
              onFocus={() => this.onFocus(field.name)}
              value={this.state[field.name].value}
              onChangeText={this._onChangeText}
              key={field.name}
              {...field}
            />
          ))}
          <MaterialTextInput
            onFocus={() => this.onFocus(long.name)}
            onChangeText={this._onChangeText}
            multiline
            {...long}
          />
        </ScrollView>
        <FullButton text="Создать" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    )
  }
}
const mapState = state => {
  return { category: state.identity.category }
}
export default connect(
  mapState,
  actions
)(BizCreate)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})
