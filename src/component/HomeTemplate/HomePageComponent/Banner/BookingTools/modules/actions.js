import axios from "axios";
import { URL_DETAIL_MOVIE } from "../../../URL";
import * as ActionType from "./constants";

export const actFetchDetailMovie = (id) => {
  return (dispatch) => {
    dispatch(actDetailMovieRequest());
    axios({
      url: URL_DETAIL_MOVIE + id,
      method: "GET",
    })
      .then((res) => {
        dispatch(actDetailMovieSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actDetailMovieFailed(err));
      });
  };
};

const actDetailMovieRequest = () => {
  return {
    type: ActionType.DETAIL_MOVIE_REQUEST,
  };
};
const actDetailMovieSuccess = (data) => {
  return {
    type: ActionType.DETAIL_MOVIE_SUCCESS,
    payload: data,
  };
};
const actDetailMovieFailed = (err) => {
  return {
    type: ActionType.DETAIL_MOVIE_FAILED,
    payload: err,
  };
};
