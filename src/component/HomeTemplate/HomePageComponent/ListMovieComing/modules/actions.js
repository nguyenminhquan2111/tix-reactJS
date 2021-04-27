import * as ActionType from "./constants";
import axios from "axios";

export const actFetchListMovieComing = () => {
  return (dispatch) => {
    dispatch(actListMovieComingRequest());
    axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
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