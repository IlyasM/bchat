import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import BusinessTabNavigator from "./BusinessTabNavigator";
import AuthScreen from "../screens/AuthScreen";
let Navigator = createSwitchNavigator(
   {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Auth: AuthScreen,
      Business: BusinessTabNavigator,
      Main: MainTabNavigator
   },
   { initialRouteName: "Auth" }
);
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider } from "react-redux";
import configureStore from "../store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "../components/Loading";

let { store, persistor } = configureStore();
export default class App extends React.Component {
   componentDidMount() {
      persistor.purge();
   }
   render() {
      return (
         <ActionSheetProvider>
            <Provider store={store}>
               <PersistGate loading={<Loading />} persistor={persistor}>
                  <Navigator />
               </PersistGate>
            </Provider>
         </ActionSheetProvider>
      );
   }
}
