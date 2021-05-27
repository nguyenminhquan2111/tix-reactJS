import * as ActionType from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const detailMovieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.DETAIL_MOVIE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.DETAIL_MOVIE_SUCCESS: {
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.DETAIL_MOVIE_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };
    }

    default:
      return state;
  }
};

export default detailMovieReducer;
