import values from "lodash/values"
import { combineEpics } from "redux-observable"
import wish from "./actions/wish"
import entities from "./actions/entities"
import messaging from "./actions/messaging"
import broadcasting from "./actions/broadcasting"
import auth from "./actions/auth"
//currently combine epics receives list of epic functions
export default combineEpics(
  ...values({ ...wish, ...entities, ...messaging, ...broadcasting, ...auth })
)
