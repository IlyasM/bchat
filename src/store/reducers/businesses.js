// import { bizList } from "../../fake-data";
export default (state = { list: [] }, action) => {
   switch (action.type) {
      case "BIZ_CATEGORY_OK":
         console.log(action.payload.businesses);
         return { list: action.payload.businesses };

      default:
         return state;
   }
};
