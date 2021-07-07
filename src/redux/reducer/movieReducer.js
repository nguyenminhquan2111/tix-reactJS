import * as ActionType from "../constants";

const initialState = {
  loading: false,
  listMovie: null,
  listMovieComing: null,
  detailMovie: null,
  listCinemaBrand: null,
  listCinemaByBrand: null,
  listMovieCinema: null,
  detailTicketRoom: null,
  listBookingChair: [],
  error: null,
  isOpen: false,
  linkTrailer: null,
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
    case ActionType.GET_LIST_MOVIE_CINEMA: {
      state.loading = false;
      state.listMovieCinema = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_DETAIL_TICKET_ROOM: {
      state.loading = false;
      state.detailTicketRoom = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.BOOKING_CHAIR: {
      let arrChair = [...state.listBookingChair];
      let index = arrChair?.findIndex((item) => item.maGhe === payload.maGhe);
      index !== -1 ? arrChair.splice(index, 1) : arrChair.push(payload);
      return { ...state, listBookingChair: arrChair };
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
    case ActionType.CLOSE_MODAL: {
      state.isOpen = false;
      state.linkTrailer = null;
      return { ...state };
    }
    case ActionType.OPEN_MODAL: {
      state.isOpen = true;
      state.linkTrailer = payload;
      return { ...state };
    }
    case ActionType.FETCH_LIST_MOVIE_REQUEST: {
      state.loading = true;
      state.listMovie = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.FETCH_LIST_MOVIE_SUCCESS: {
      state.loading = false;
      state.listMovie = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.FETCH_LIST_MOVIE_FAILED: {
      state.loading = false;
      state.listMovie = null;
      state.error = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default movieReducer;
