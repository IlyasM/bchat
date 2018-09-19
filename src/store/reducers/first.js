export default (state = {}, action) => {
   switch (action.type) {
      case "LOAD_DATA_FULL":
         return { data: { ...action.data, filtered: action.data.list } };
      case "TOGGLE":
         return {
            data: {
               ...state.data,
               filtered:
                  action.all > 0
                     ? state.data.list.filter(item => item.online)
                     : state.data.list
            }
         };
      default:
         return state;
   }
};
