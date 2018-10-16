import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";
import { uuid4 } from "fast-uuid";

export const actions = {
   wishLoad: () => ({
      type: "WISH_LOAD"
   }),
   wishAccept: (wish, text) => ({
      type: "WISH_ACCEPT",
      wish,
      text
   }),
   wishDecline: wish => ({
      type: "WISH_DECLINE",
      wish
   }),
   wishNew: wish => ({
      type: "WISH_NEW",
      wish
   })
};
export default {
   wishLoad: (action$, state$) =>
      action$.pipe(
         ofType("WISH_LOAD"),
         withLatestFrom(state$),
         map(([action, { broadcast: { myBroadcasts } }]) => {
            return {
               type: "WISH_LOADED",
               wishes: myBroadcasts.filter(i => i.active)
            };
         })
      )
};
