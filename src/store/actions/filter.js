import { mergeMap, catchError, map } from "rxjs/operators"
import { from } from "rxjs"
import { Observable } from "rxjs"
import { ofType } from "redux-observable"

export const actions = {
  filter: query => ({
    type: "FILTER_CATEGORIES",
    query
  })
}
