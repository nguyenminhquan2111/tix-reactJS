import axios from "axios";
import * as ActionType from "../constants";
import { URL_LOGIN_USER } from "../urlAPI";
import Swal from "sweetalert2";

export const fetchLoginForm = (user, history) => {
  return (dispatch) => {
    dispatch(actFormRequest());
    axios({
      url: URL_LOGIN_USER,
      method: "POST",
      data: user,
    })
      .then((result) => {
        console.log(result.data);

        localStorage.setItem("UserCustomer", JSON.stringify(result.data));
        history.replace("/");
        dispatch(actFormSuccess(result.data));
      })
      .catch((error) => {
        Swal.fire("Tài khoản hoặc mật khẩu sai", "", "error");
        console.log(error);
        dispatch(actFormFailed(error));
      });
  };
};

const actFormRequest = () => {
  return {
    type: ActionType.FORM_REQUEST,
  };
};
const actFormSuccess = (data) => {
  return {
    type: ActionType.FORM_SUCCESS,
    payload: data,
  };
};

const actFormFailed = (err) => {
  return {
    type: ActionType.FORM_FAILED,
    payload: err,
  };
};
