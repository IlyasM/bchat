import values from "lodash/values";
import { combineEpics } from "redux-observable";
import wish from "./actions/wish";
import businesses from "./actions/businesses";
import messaging from "./actions/messaging";
import broadcasting from "./actions/broadcasting";
//currently combine epics receives list of epic functions
import { Observable } from "rxjs";
export default combineEpics(
   ...values({ ...wish, ...businesses, ...messaging, ...broadcasting })
);
