import axios from "axios";
import * as ActionType from "../constants";
import { URL_LOGIN_USER } from "../urlAPI";
import Swal from "sweetalert2";

export const actLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    axios({
      url: URL_LOGIN_USER,
      method: "POST",
      data: user,
    })
      .then((result) => {
        console.log(result.data);

        localStorage.setItem("UserCustomer", JSON.stringify(result.data));
        Swal.fire("Đăng nhập thành công", "", "success");
        history.replace("/");
        dispatch(actLoginSuccess(result.data));
      })
      .catch((error) => {
        Swal.fire("Tài khoản hoặc mật khẩu sai", "", "error");
        console.log(error);
        dispatch(actLoginFailed(error));
      });
  };
};

const actLoginRequest = () => {
  return {
    type: ActionType.FORM_REQUEST,
  };
};

const actLoginSuccess = (data) => {
  return {
    type: ActionType.FORM_SUCCESS,
    payload: data,
  };
};

const actLoginFailed = (err) => {
  return {
    type: ActionType.FORM_FAILED,
    payload: err,
  };
};
