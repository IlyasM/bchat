import { mergeMap, catchError, map } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";

export const actions = {
   toggle: mode => ({
      type: "SWITCH_ACCOUNT",
      mode
   })
};
