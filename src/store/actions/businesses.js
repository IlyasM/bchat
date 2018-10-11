import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";
export const actions = {
   fetch: id => ({
      type: "BIZ_CATEGORY",
      id
   })
};
export default {
   fetch: (action$, state$) =>
      action$.pipe(
         ofType("BIZ_CATEGORY"),
         withLatestFrom(state$),
         mergeMap(([{ id }, { identity: { channel } }]) =>
            Observable.create(observer => {
               channel.push("biz:category", { id }).receive("ok", response => {
                  observer.next({
                     type: "BIZ_CATEGORY_OK",
                     payload: response
                  });
               });
            })
         )
      )
};
