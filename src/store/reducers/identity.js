const init = {
   socket: null,
   channel: null,
   loading: false,
   myId: null,
   email: null,
   token: null,
   verifyCodeError: ""
};
export default (state = init, action) => {
   switch (action.type) {
      case "CONNECT":
         const myId = action.bizId
            ? "business:" + action.bizId
            : "user:" + action.id;
         console.log("identity reducer connected", myId);
         return { ...state, loading: true, myId };

      case "JOIN_MAIN_OK":
         return {
            ...state,
            loading: false,
            socket: action.payload.scoket,
            channel: action.payload.channel
         };
      case "REGISTER":
         return { ...state, verifyCodeError: "" };
      case "REGISTER_OK":
         return {
            ...state,
            email: action.payload.email
         };
      case "VERIFY_CODE_OK":
         return { ...state, token: action.token, verifyCodeError: "" };
      case "VERIFY_CODE_ERROR":
         return { ...state, verifyCodeError: action.error };
      default:
         return state;
   }
};
