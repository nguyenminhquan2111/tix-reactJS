import * as ActionType from "../constants";

const initialState = {
  loading: false,
  listMovie: null,
  listMovieComing: null,
  detailMovie: null,
  listCinemaBrand: null,
  listCinemaByBrand: null,
  error: null,
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.GET_LIST_MOVIE: {
      state.loading = false;
      state.listMovie = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_LIST_MOVIE_COMING: {
      state.loading = false;
      state.listMovieComing = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_DETAIL_MOVIE: {
      state.loading = false;
      state.detailMovie = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_LIST_CINEMA_BRAND: {
      state.loading = false;
      state.listCinemaBrand = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_LIST_CINEMA_BY_BRAND: {
      state.loading = false;
      state.listCinemaByBrand = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.API_REQUEST: {
      state.loading = true;
      state.detailMovie = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.API_FAILED: {
      state.loading = false;
      state.detailMovie = null;
      state.error = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default movieReducer;
