import { combineReducers } from "redux";
import listMovieReducer from "../../component/HomeTemplate/HomePageComponent/ShowingMovie/ListMovie/modules/reducer";
import listMovieComingReducer from "../../component/HomeTemplate/HomePageComponent/ShowingMovie/ListMovieComing/modules/reducer";
import detailMovieReducer from "../../component/HomeTemplate/HomePageComponent/Banner/BookingTools/modules/reducer";

const rootReducer = combineReducers({
  listMovieReducer,
  listMovieComingReducer,
  detailMovieReducer,
});

export default rootReducer;
