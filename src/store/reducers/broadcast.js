type Question = {
   text: String,
   category: Object,
   active: Boolean,
   replies: []
};
type State = { myBroadcasts: [Question] };

const init: State = {
   myBroadcasts: []
};
export default (state = init, action) => {
   switch (action.type) {
      case "BROADCAST":
         return {
            myBroadcasts: [
               { text: action.text, category: action.category, active: true },
               ...state.myBroadcasts
            ]
         };
      case "TOGGLE":
         const toReturn = state.myBroadcasts.filter(
            b => b.text !== action.text
         );
         return {
            myBroadcasts: [
               ...toReturn,
               {
                  text: action.text,
                  category: action.category,
                  active: action.flag
               }
            ]
         };
      default:
         return state;
   }
};
