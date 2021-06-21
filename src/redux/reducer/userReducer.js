import * as ActionType from "../constants";
const initialState = {
  loading: false,
  data: null,
  error: null,
  listUser: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FORM_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    case ActionType.FORM_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    case ActionType.FORM_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    case ActionType.SIGN_UP_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    case ActionType.SIGN_UP_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    case ActionType.GET_LIST_USER_REQUEST:
      state.loading = true;
      state.listUser = null;
      state.error = null;
      return { ...state };
    case ActionType.GET_LIST_USER_SUCCESS:
      state.loading = false;
      state.listUser = action.payload;
      state.error = null;
      return { ...state };
    case ActionType.GET_LIST_USER_FAILED:
      state.loading = false;
      state.listUser = null;
      state.error = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default userReducer;
