import { bizList } from "../../fake-data";
export default (state = { list: bizList }, action) => {
   switch (action.type) {
      case "LOAD_MESSAGES":
         return state;

      default:
         return state;
   }
};
