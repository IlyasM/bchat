import React from "react";
import {
   Button,
   TextInput,
   View,
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Dimensions
} from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import KeyboardSpacer from "react-native-keyboard-spacer";
import makeInputGreatAgain, {
   withNextInputAutoFocusForm,
   withNextInputAutoFocusInput
} from "react-native-formik";
import MaterialTextInput from "./MaterialTextInput";

const MyInput = compose(
   makeInputGreatAgain,
   withNextInputAutoFocusInput
)(MaterialTextInput);
const Form = withNextInputAutoFocusForm(View);
const HEIGHT = Dimensions.get("window").height;
const validationSchema = Yup.object().shape({
   name: Yup.string().required("Необходимо Ваше название"),
   short: Yup.string().required("Забыли краткое описание"),
   long: Yup.string(),
   phone: Yup.string().required("Забыли телефон")
});
import TagChooser from "../components/tagChooser";

export default props => (
   <KeyboardAvoidingView
      // keyboardVerticalOffset={100}
      behavior="padding"
      style={styles.container}
   >
      <ScrollView
         contentContainerStyle={{
            backgroundColor: "white",
            padding: 15,
            flex: 1
         }}
         keyboardShouldPersistTaps="handled"
      >
         <Formik
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
            render={props => {
               console.log(props);
               return (
                  <Form>
                     <MyInput label="Название" name="name" type="name" />
                     <MyInput
                        placeholder="Кв посуточно от 2000 тенге в час!"
                        label="Краткое описание"
                        name="short"
                     />
                     <MyInput label="Подробнее о Вас" name="long" />
                     <MyInput
                        keyboardType={"number-pad"}
                        label="Телефон"
                        name="phone"
                     />

                     <Button onPress={props.handleSubmit} title="Создать" />
                  </Form>
               );
            }}
         />
      </ScrollView>
   </KeyboardAvoidingView>
);
const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: "white" }
});
