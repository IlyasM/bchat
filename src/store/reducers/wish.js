import { uuid4 } from "fast-uuid";

type Wish = {
   id: String,
   text: String,
   category: Object
};

type State = { wishList: [Wish] };

const init: State = {
   wishList: []
};
export default (state = init, action) => {
   switch (action.type) {
      case "WISH_LOADED":
         return { wishList: action.wishes };
      case "WISH_ACCEPT":
      case "WISH_DECLINE":
         return {
            wishList: state.wishList.filter(wish => wish.id !== action.wish.id)
         };
      case "WISH_ADD":
         return {
            wishList: [action.wish, ...state.wishList]
         };
      default:
         return state;
   }
};
