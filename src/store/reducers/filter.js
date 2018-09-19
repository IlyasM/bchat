import { categories } from "../../fake-data";
export default (state = { results: categories, query: "" }, action) => {
   switch (action.type) {
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
