import values from "lodash/values";
import { combineEpics } from "redux-observable";
import first from "./actions/firstActions";
//currently combine epics receives list of epic functions
import { Observable } from "rxjs";
export default combineEpics(...values({ ...first }));
