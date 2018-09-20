import { mergeMap, catchError, map } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";

export const actions = {
   broadcast: (text, category) => ({
      type: "BROADCAST",
      text,
      category
   }),
   toggle: (text, category, flag) => ({
      type: "BROADCAST_TOGGLE",
      text,
      category,
      flag
   })
};
