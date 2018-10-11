export default (state = { results: [], query: "" }, action) => {
   switch (action.type) {
      case "AFTER_JOIN":
         return {
            ...state,
            results: action.payload.categories
         };
      case "FILTER_CATEGORIES":
         return {
            query: action.query,
            results: categories.filter(
               category =>
                  category.name.toLowerCase().indexOf(action.query) > -1
            )
         };

      default:
         return state;
   }
};
