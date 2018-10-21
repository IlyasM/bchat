import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators"
import { Observable } from "rxjs"
import { ofType } from "redux-observable"
export const actions = {
  fetch: id => ({
    type: "BIZ_CATEGORY",
    id
  }),
  setCategory: category => ({
    type: "SET_CATEGORY",
    category
  }),
  createBusiness: business => ({
    type: "CREATE_BUSINESS",
    business
  }),
  afterJoin: payload => ({
    type: "AFTER_JOIN",
    payload
  })
}
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
            })
          })
        })
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
            }
          }),
          catchError(({ response }) => {
            return of({
              type: "CREATE_BUSINESS_ERROR",
              error: response && response.error
            })
          })
        )
      )
    )
}
