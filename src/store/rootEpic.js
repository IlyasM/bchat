import values from "lodash/values";
import { combineEpics } from "redux-observable";
import first from "./actions/firstActions";
import wish from "./actions/wish";
import businesses from "./actions/businesses";
import messaging from "./actions/messaging";
//currently combine epics receives list of epic functions
import { Observable } from "rxjs";
export default combineEpics(
   ...values({ ...first, ...wish, ...businesses, ...messaging })
);
