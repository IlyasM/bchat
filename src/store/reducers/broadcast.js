import { uuid4 } from "fast-uuid";

type Question = {
   text: String,
   category: Object,
   active: Boolean,
   replies: []
};
type State = { myBroadcasts: [Question] };

const init: State = {
   myBroadcasts: [],
   activeTab: true
};
export default (state = init, action) => {
   switch (action.type) {
      case "BROADCAST_TOGGLE":
         const toReturn = state.myBroadcasts.filter(
            b => b.id !== action.question.id
         );
         return {
            ...state,
            myBroadcasts: [
               {
                  ...action.question,
                  active: action.flag
               },
               ...toReturn
            ]
         };
      case "BROADCAST_TAB_TOGGLE":
         return {
            ...state,
            activeTab: action.flag
         };
      default:
         return state;
   }
};
