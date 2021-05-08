import { combineReducers } from "redux";
import listMovieReducer from "../../component/HomeTemplate/HomePageComponent/ListMovie/modules/reducer";
import listMovieComingReducer from "../../component/HomeTemplate/HomePageComponent/ListMovieComing/modules/reducer";
import detailMovieReducer from "../../component/HomeTemplate/HomePageComponent/BookingTools/modules/reducer";

const rootReducer = combineReducers({
  listMovieReducer,
  listMovieComingReducer,
  detailMovieReducer,
});

export default rootReducer;
