const init = {
  socket: null,
  channel: null,
  loading: false,
  myId: null,
  email: null,
  token:
    "SFMyNTY.g3QAAAACZAAEZGF0YW0AAAAUaWx5YXNrejdAZ21haWwuY29tOjFkAAZzaWduZWRuBgCuhwKbZgE.h6CubxA3LeB8p5Y9bo_6h0SMcnBMxlmisWXGH7YBpWI",
  verifyCodeError: "",
  me: {},
  category: null
}
export default (state = init, action) => {
  switch (action.type) {
    case "CONNECT":
      const myId = action.me.category
        ? "business:" + action.me.id
        : "user:" + action.me.id
      return { ...state, loading: true, myId, me: action.me }
    case "SET_CATEGORY":
      return { ...state, category: action.category }

    case "JOIN_MAIN_OK":
      return {
        ...state,
        loading: false,
        socket: action.payload.scoket,
        channel: action.payload.channel
      }
    case "REGISTER":
      return { ...state, verifyCodeError: "" }
    case "REGISTER_OK":
      return {
        ...state,
        email: action.payload.email
      }
    case "VERIFY_CODE_OK":
      return { ...state, token: action.token, verifyCodeError: "" }
    case "VERIFY_CODE_ERROR":
      return { ...state, verifyCodeError: action.error }
    default:
      return state
  }
}
