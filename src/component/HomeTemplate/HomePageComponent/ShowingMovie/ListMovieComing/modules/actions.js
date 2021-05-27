import * as ActionType from "./constants";
import axios from "axios";
import { URL_LIST_MOVIE_COMING } from "../../../URL";

export const actFetchListMovieComing = () => {
  return (dispatch) => {
    dispatch(actListMovieComingRequest());
    axios({
      url: URL_LIST_MOVIE_COMING,
      method: "GET",
    })
      .then((res) => {
        dispatch(actListMovieComingSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actListMovieComingFailed(err));
      });
  };
};

const actListMovieComingRequest = () => {
  return {
    type: ActionType.LIST_MOVIE_COMING_REQUEST,
  };
};

const actListMovieComingSuccess = (data) => {
  return {
    type: ActionType.LIST_MOVIE_COMING_SUCCESS,
    payload: data,
  };
};

const actListMovieComingFailed = (err) => {
  return {
    type: ActionType.LIST_MOVIE_COMING_FAILED,
    payload: err,
  };
};
