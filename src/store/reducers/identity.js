const init = {
   socket: null,
   channel: null,
   loading: false,
   myId: null
};
export default (state = init, action) => {
   switch (action.type) {
      case "CONNECT":
         const myId = action.bizId
            ? "business:" + action.bizId
            : "user:" + action.id;
         console.log("in connect", myId);
         return { ...state, loading: true, myId };

      case "JOIN_MAIN_OK":
         return {
            ...state,
            loading: false,
            socket: action.payload.scoket,
            channel: action.payload.channel
         };
      default:
         return state;
   }
};
