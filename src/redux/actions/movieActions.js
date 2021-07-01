import axios from "axios";
import * as ActionType from "../constants";
import {
  URL_GET_DETAIL_MOVIE,
  URL_GET_LIST_CINEMA_BRAND,
  URL_GET_LIST_CINEMA_BY_BRAND,
  URL_GET_LIST_MOVIE,
  URL_GET_LIST_MOVIE_COMING,
  URL_ADD_AND_UPDATE_MOVIE,
  URL_DELETE_MOVIE,
} from "../urlAPI";

//get from API
export const actGetListMovie = () => {
  return (dispatch) => {
    axios({
      url: URL_GET_LIST_MOVIE,
      method: "GET",
    })
      .then((res) => {
        dispatch(actListMovie(res.data));
      })
      .catch((err) => {});
  };
};
export const actGetListMovieComing = () => {
  return (dispatch) => {
    axios({
      url: URL_GET_LIST_MOVIE_COMING,
      method: "GET",
    })
      .then((res) => {
        dispatch(actListMovieComing(res.data));
      })
      .catch((err) => {});
  };
};
export const actGetDetailMovie = (idMovie) => {
  return (dispatch) => {
    dispatch(actRequestAPI());
    axios({
      url: URL_GET_DETAIL_MOVIE(idMovie),
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch(actDetailMovie(res.data));
      })
      .catch((err) => {
        dispatch(actFailedAPI(err));
      });
  };
};
export const actGetCinemaBrand = () => {
  return (dispatch) => {
    axios({
      url: URL_GET_LIST_CINEMA_BRAND,
      method: "GET",
    })
      .then((res) => {
        dispatch(actCinemaBrand(res.data));
      })
      .catch();
  };
};
export const actGetListCinemaByBrand = (idCinema) => {
  return (dispatch) => {
    axios({
      url: URL_GET_LIST_CINEMA_BY_BRAND(idCinema),
      method: "GET",
    })
      .then((res) => {
        dispatch(actCinemaByBrand(res.data));
      })
      .catch();
  };
};

export const actHandleModal = (res, link = null) => {
  return (dispatch) => {
    if (res) dispatch(actOpenModal(link));
    else dispatch(actCloseModal());
  };
};
export const actFetchListMovie = () => {
  return (dispatch) => {
    dispatch(actFetchListMovieRequest());
    axios({
      url: URL_GET_LIST_MOVIE,
      method: "GET",
    })
      .then((result) => {
        console.log(result.data);
        dispatch(actFetchListMovieSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actFetchListMovieFailed(error));
      });
  };
};
export const actDeleteMovie = (movie) => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return axios({
    method: "DELETE",
    url: URL_DELETE_MOVIE(movie.maPhim),
    data: movie.maPhim,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
export const actAddMovie = (movie) => {
  let moment = require("moment");
  let form_data = new FormData();
  let ngayKhoiChieu = moment(movie.ngayKhoiChieu).format("DD/MM/YYYY");
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  let maPhim = parseInt(movie.maPhim, 10);
  let danhGia = parseInt(movie.danhGia, 10);
  let movieAdd = {
    ...movie,
    maNhom: "GP09",
    maPhim: maPhim,
    danhGia: danhGia,
    ngayKhoiChieu: ngayKhoiChieu,
  };
  for (const i in movieAdd) {
    console.log(i, movieAdd[i]);
    form_data.append(i, movieAdd[i]);
  }
  return axios({
    method: "POST",
    url: URL_ADD_AND_UPDATE_MOVIE,
    // "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim",
    data: form_data,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
export const actEditMovie = (movie) => {
  let moment = require("moment");
  let ngayKhoiChieu = moment(movie.ngayKhoiChieu).format("DD/MM/YYYY");
  let form_data = new FormData();
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  let maPhim = parseInt(movie.maPhim, 10);
  let danhGia = parseInt(movie.danhGia, 10);
  let movieAdd = {
    ...movie,
    maNhom: "GP09",
    maPhim: maPhim,
    danhGia: danhGia,
    ngayKhoiChieu: ngayKhoiChieu,
  };
  for (const i in movieAdd) {
    console.log(i, movieAdd[i]);
    form_data.append(i, movieAdd[i]);
  }
  return axios({
    method: "POST",
    url: URL_ADD_AND_UPDATE_MOVIE,
    data: form_data,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
//actions
const actFetchListMovieRequest = () => {
  return {
    type: ActionType.FETCH_LIST_MOVIE_REQUEST,
  };
};
const actFetchListMovieSuccess = (data) => {
  return {
    type: ActionType.FETCH_LIST_MOVIE_SUCCESS,
    payload: data,
  };
};
const actFetchListMovieFailed = (error) => {
  return {
    type: ActionType.FETCH_LIST_MOVIE_FAILED,
    payload: error,
  };
};
const actOpenModal = (link) => {
  return {
    type: ActionType.OPEN_MODAL,
    payload: link,
  };
};
const actCloseModal = () => {
  return {
    type: ActionType.CLOSE_MODAL,
  };
};
const actListMovie = (data) => {
  return {
    type: ActionType.GET_LIST_MOVIE,
    payload: data,
  };
};

const actListMovieComing = (data) => {
  return {
    type: ActionType.GET_LIST_MOVIE_COMING,
    payload: data,
  };
};

const actDetailMovie = (data) => {
  return {
    type: ActionType.GET_DETAIL_MOVIE,
    payload: data,
  };
};

const actCinemaBrand = (data) => {
  return {
    type: ActionType.GET_LIST_CINEMA_BRAND,
    payload: data,
  };
};

const actCinemaByBrand = (data) => {
  return {
    type: ActionType.GET_LIST_CINEMA_BY_BRAND,
    payload: data,
  };
};

const actRequestAPI = () => {
  return {
    type: ActionType.API_REQUEST,
  };
};

const actFailedAPI = () => {
  return {
    type: ActionType.API_FAILED,
  };
};
