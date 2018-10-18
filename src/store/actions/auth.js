import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { baseURL, headers } from "../../constants/networking";
export const actions = {
   register: (email, navigation) => ({
      type: "REGISTER",
      email,
      navigation
   }),
   verifyCode: (code, email) => ({
      type: "VERIFY_CODE",
      code,
      email
   }),
   enterName: name => ({
      type: "ENTER_NAME",
      name
   })
};
export default {
   register: (action$: Observable<Action>) =>
      action$.pipe(
         ofType("REGISTER"),
         mergeMap(({ email, navigation }) =>
            ajax.post(baseURL + "register", { email: email }, headers).pipe(
               map(_resp => {
                  navigation && navigation.navigate("EnterCode");
                  return {
                     type: "REGISTER_OK",
                     payload: {
                        message: "отправили код на " + email,
                        email: email
                     }
                  };
               })
            )
         )
      ),
   verifyCode: (action$: Observable<Action>) =>
      action$.pipe(
         ofType("VERIFY_CODE"),
         mergeMap(({ email, code }) =>
            ajax.post(baseURL + "verify", { email, code }, headers).pipe(
               map(({ response }) => {
                  if (response.token) {
                     return {
                        type: "VERIFY_CODE_OK",
                        token: response.token
                     };
                  }
               }),
               catchError(({ response }) => {
                  return of({
                     type: "VERIFY_CODE_ERROR",
                     error: response.error
                  });
               })
            )
         )
      )
};
