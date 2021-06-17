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
        Swal.fire({
          width: "400",
          height: "100",
          backdrop: "none",
          showCloseButton: true,
          icon: "success",
          title: "Đăng nhập thành công",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        history.replace("/");
        dispatch(actLoginSuccess(result.data));
      })
      .catch((error) => {
        Swal.fire({
          width: "400",
          height: "100",
          backdrop: "none",
          showCloseButton: true,
          icon: "error",
          title: "Tài khoản hoặc mật khẩu sai",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
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
