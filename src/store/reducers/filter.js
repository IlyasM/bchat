export default (state = { results: [], categories: [], query: "" }, action) => {
   switch (action.type) {
      case "AFTER_JOIN":
         return {
            ...state,
            categories: action.payload.categories,
            results: action.payload.categories
         };
      case "FILTER_CATEGORIES":
         return {
            ...state,
            query: action.query,
            results: state.categories.filter(
               category =>
                  category.name.toLowerCase().indexOf(action.query) > -1
            )
         };

      default:
         return state;
   }
};
