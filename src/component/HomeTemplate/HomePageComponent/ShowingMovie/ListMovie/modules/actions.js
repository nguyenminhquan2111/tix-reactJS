import * as ActionType from "./constants";
import axios from "axios";
import { URL_LIST_MOVIE } from "../../../URL";

export const actFetchListMovie = () => {
  return (dispatch) => {
    dispatch(actListMovieRequest());
    axios({
      url: URL_LIST_MOVIE,
      method: "GET",
    })
      .then((res) => {
        dispatch(actListMovieSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actListMovieFailed(err));
      });
  };
};

const actListMovieRequest = () => {
  return {
    type: ActionType.LIST_MOVIE_REQUEST,
  };
};

const actListMovieSuccess = (data) => {
  return {
    type: ActionType.LIST_MOVIE_SUCCESS,
    payload: data,
  };
};

const actListMovieFailed = (err) => {
  return {
    type: ActionType.LIST_MOVIE_FAILED,
    payload: err,
  };
};
