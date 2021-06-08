import * as ActionType from "../constants";
const initialState = {
  loading: false,
  dataSignIn: null,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FORM_REQUEST:
      state.loading = true;
      state.dataSignIn = null;
      state.error = null;
      return { ...state };
    case ActionType.FORM_SUCCESS:
      state.loading = false;
      state.dataSignIn = action.payload;
      state.error = null;
      return { ...state };
    case ActionType.FORM_FAILED:
      state.loading = false;
      state.dataSignIn = null;
      state.error = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default userReducer;
