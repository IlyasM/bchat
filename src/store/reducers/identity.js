const init = {
   socket: null,
   channel: null,
   loading: false
};
export default (state = init, action) => {
   switch (action.type) {
      case "CONNECT": {
         return { ...state, loading: true };
      }
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
