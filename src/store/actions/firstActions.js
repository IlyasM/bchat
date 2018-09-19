import { mergeMap, catchError, map } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";
import { generate } from "../../fake-data";
export const loadActions = {
   loadData: () => ({
      type: "LOAD_DATA"
   }),
   toggle: all => ({
      type: "TOGGLE",
      all
   })
};
export default {
   loadData: action$ =>
      action$.pipe(
         ofType("LOAD_DATA"),
         mergeMap(action => from(generate(50))),
         map(data => {
            return { type: "LOAD_DATA_FULL", data };
         })
      )
};
