import { createSelector } from "reselect"
const getQuery = state => state.filter.query
const getCategories = state => state.filter.categories
export const getFilteredCategories = createSelector(
  [getQuery, getCategories],
  (query, categories) => {
    return categories.filter(
      category => category.name.toLowerCase().indexOf(query) > -1
    )
  }
)

export default (state = { categories: [], query: "" }, action) => {
  switch (action.type) {
    case "AFTER_JOIN":
      return {
        ...state,
        categories: action.payload.categories
      }
    case "GET_CATEGORIES_OK":
      return {
        ...state,
        categories: action.categories
      }
    case "FILTER_CATEGORIES":
      return {
        ...state,
        query: action.query
      }

    default:
      return state
  }
}
