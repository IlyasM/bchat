import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { baseURL, headers } from "../../constants/networking";
export const actions = {
   register: email => ({
      type: "REGISTER",
      email
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
         mergeMap(action =>
            ajax
               .post(baseURL + "register", { email: action.email }, headers)
               .pipe(
                  map(
                     _resp =>
                        console.log(_resp) || {
                           type: "REGISTER_OK",
                           payload: {
                              message: "отправили код на " + action.email,
                              email: action.email
                           }
                        }
                  ),
                  catchError(({ xhr: { _response: { errors } } }) =>
                     of({ type: "REGISTER_ERROR", error: errors })
                  )
               )
         )
      ),
   verifyCode: (action$: Observable<Action>) =>
      action$.pipe(
         ofType("VERIFY_CODE"),
         mergeMap(({ email, code }) =>
            ajax.post(baseURL + "verify", { email, code }, headers).pipe(
               map(({ response: { token } }) => ({
                  type: "VERIFY_CODE",
                  token
               })),
               catchError(({ xhr: { _response: { error } } }) =>
                  of({ type: "VERIFY_CODE_ERROR", error })
               )
            )
         )
      )
};
