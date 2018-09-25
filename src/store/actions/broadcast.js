import { mergeMap, catchError, map } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";

export const actions = {
   broadcast: (text, category) => ({
      type: "BROADCAST_CREATE",
      text,
      category
   }),
   broadcastToggle: (question, flag) => ({
      type: "BROADCAST_TOGGLE",
      question,
      flag
   }),
   broadcastTabToggle: flag => ({
      type: "BROADCAST_TAB_TOGGLE",
      flag
   })
};
