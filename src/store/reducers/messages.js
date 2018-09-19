import { messages } from "../../fake-data";
export default (state = { items: messages(), loading: false }, action) => {
   switch (action.type) {
      case "LOAD_MESSAGES":
         return state;

      default:
         return state;
   }
};
