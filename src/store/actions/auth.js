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
   verifyCode: (code, email, navigation) => ({
      type: "VERIFY_CODE",
      code,
      email,
      navigation
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
               }),
               catchError(({ response }) => {
                  return of({
                     type: "VERIFY_CODE_ERROR",
                     error: "something went wrong"
                  });
               })
            )
         )
      ),
   verifyCode: (action$: Observable<Action>) =>
      action$.pipe(
         ofType("VERIFY_CODE"),
         mergeMap(({ email, code, navigation }) =>
            ajax.post(baseURL + "verify", { email, code }, headers).pipe(
               map(({ response }) => {
                  navigation && navigation.navigate("Choice");
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
                     error: response && response.error
                  });
               })
            )
         )
      ),
   createBusiness: action$ =>
      action$.pipe(
         ofType("CREATE_BUSINESS"),
         mergeMap(({ business }) =>
            ajax.post(baseURL + "create-business", { business }, headers).pipe(
               map(({ response }) => {
                  return {
                     type: "CREATE_BUSINESS_OK",
                     business: response.business
                  };
               }),
               catchError(({ response }) => {
                  return of({
                     type: "CREATE_BUSINESS_ERROR",
                     error: response && response.error
                  });
               })
            )
         )
      )
};
