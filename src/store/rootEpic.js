import values from "lodash/values";
import { combineEpics } from "redux-observable";
import first from "./actions/firstActions";
import wish from "./actions/wish";
//currently combine epics receives list of epic functions
import { Observable } from "rxjs";
export default combineEpics(...values({ ...first, ...wish }));
