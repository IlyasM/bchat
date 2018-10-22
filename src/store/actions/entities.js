import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators"
import { Observable, of } from "rxjs"
import { ofType } from "redux-observable"
import { ajax } from "rxjs/ajax"
import { baseURL, headers } from "../../constants/networking"
export const actions = {
  fetch: id => ({
    type: "BIZ_CATEGORY",
    id
  }),
  setCategory: category => ({
    type: "SET_CATEGORY",
    category
  }),
  createBusiness: (business, navigation) => ({
    type: "CREATE_BUSINESS",
    business,
    navigation
  }),
  getCategories: () => ({
    type: "GET_CATEGORIES"
  }),
  afterJoin: payload => ({
    type: "AFTER_JOIN",
    payload
  }),
  userName: (name, navigation) => ({
    type: "USER_NAME",
    user: { name },
    navigation
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
  getCategories: (action$, state$) =>
    action$.pipe(
      ofType("GET_CATEGORIES"),
      withLatestFrom(state$),
      mergeMap(([action, { identity: { token } }]) => {
        console.log(action)
        return ajax
          .get(baseURL + "categories", {
            ...headers,
            Authorization: `Bearer: ${token}`
          })
          .pipe(
            map(({ response }) => {
              return {
                type: "GET_CATEGORIES_OK",
                categories: response.categories
              }
            }),
            catchError(({ xhr }) => {
              return of({
                type: "NETWORK_ERROR",
                error: xhr && xhr._response
              })
            })
          )
      })
    ),
  createBusiness: (action$, state$) =>
    action$.pipe(
      ofType("CREATE_BUSINESS"),
      withLatestFrom(state$),

      mergeMap(([{ business, navigation }, { identity: { token } }]) =>
        ajax
          .post(
            baseURL + "business/new",
            { business },
            {
              ...headers,
              Authorization: `Bearer: ${token}`
            }
          )
          .pipe(
            map(({ response }) => {
              navigation && navigation.navigate("Business")
              return {
                type: "CONNECT",
                me: response.business
              }
            }),
            catchError(({ xhr }) => {
              return of({
                type: "NETWORK_ERROR",
                error: xhr && xhr._response
              })
            })
          )
      )
    ),
  userName: (action$, state$) =>
    action$.pipe(
      ofType("USER_NAME"),
      withLatestFrom(state$),
      mergeMap(([{ user, navigation }, { identity: { token } }]) =>
        ajax
          .post(
            baseURL + "user/update",
            { user },
            {
              ...headers,
              Authorization: `Bearer: ${token}`
            }
          )
          .pipe(
            map(({ response }) => {
              navigation && navigation.navigate("Main")
              return {
                type: "CONNECT",
                me: response.user
              }
            }),
            catchError(({ xhr }) => {
              return of({
                type: "NETWORK_ERROR",
                error: xhr && xhr._response
              })
            })
          )
      )
    )
}
