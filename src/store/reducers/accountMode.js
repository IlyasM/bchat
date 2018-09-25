export default (state = { mode: "BUSINESS" }, action) => {
   switch (action.type) {
      case "SWITCH_ACCOUNT":
         return { mode: action.mode };

      default:
         return state;
   }
};
