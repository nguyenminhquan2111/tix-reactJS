import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import userReducer from "./userReducer";
import theaterReducer from "./theaterReducer";
const rootReducer = combineReducers({
  movieReducer,
  userReducer,
  theaterReducer,
});

export default rootReducer;
