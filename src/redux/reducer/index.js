import { combineReducers } from "redux";
import listMovieReducer from "../../component/HomeTemplate/HomePageComponent/ListMovie/modules/reducer.js";

const rootReducer = combineReducers({
  listMovieReducer,
});

export default rootReducer;
