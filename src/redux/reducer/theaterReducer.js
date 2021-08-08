import * as ActionType from "../constants";
const initialState = {
  loading: false,
  data: [],
  error: null,
};
const theaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_THEATER_REQUEST:
      state.loading = true;
      state.data = [];
      state.error = null;
      return { ...state };
    case ActionType.FETCH_THEATER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    case ActionType.FETCH_THEATER_FAILED:
      state.loading = false;
      state.data = [];
      state.error = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default theaterReducer;
