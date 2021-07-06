import axios from "axios";
import * as ActionType from "../constants";
import { URL_LOGIN_USER, URL_SIGN_UP_USER, URL_GET_LIST_USER } from "../urlAPI";
import Swal from "sweetalert2";
import { URL_DELETE_USER, URL_EDIT_USER, URL_ADD_USER } from "../urlAPI";

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
export const actSignUp = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    axios({
      url: URL_SIGN_UP_USER,
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
          title: "Đăng ký thành công",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        history.replace("/");
        dispatch(actSignUpSuccess(result.data));
      })
      .catch((error) => {
        Swal.fire({
          width: "400",
          height: "100",
          backdrop: "none",
          showCloseButton: true,
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        dispatch(actSignUpFailed(error));
      });
  };
};
export const actAuth = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    axios({
      url: URL_LOGIN_USER,
      method: "POST",
      data: user,
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.maLoaiNguoiDung === "KhachHang") {
          return Promise.reject({
            response: {
              data: "Bạn không có quyền truy cập",
            },
          });
        }
        localStorage.setItem("UserAdmin", JSON.stringify(result.data));
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
        history.replace("/admin/dashboard-user");
        dispatch(actLoginSuccess(result.data));
      })
      .catch((error) => {
        // Swal.fire({
        //   width: "400",
        //   height: "100",
        //   backdrop: "none",
        //   showCloseButton: true,
        //   icon: "error",
        //   title: "Tài khoản hoặc mật khẩu sai",
        //   showConfirmButton: false,
        //   timer: 2500,
        //   timerProgressBar: true,
        // });
        console.log(error.response.data);

        dispatch(actLoginFailed(error));
      });
  };
};
export const actFetchListUser = () => {
  return (dispatch) => {
    dispatch(actGetListUserRequest());
    axios({
      url: URL_GET_LIST_USER,
      method: "GET",
    })
      .then((result) => {
        console.log(result.data);
        dispatch(actGetListUserSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actGetListUserFailed(error));
      });
  };
};

export const actDeleteUser = (user) => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return axios({
    method: "DELETE",
    url: URL_DELETE_USER(user.taiKhoan),
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
export const actEditUser = (user) => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  let userEdit = { ...user, maNhom: "GP09" };
  return axios({
    method: "PUT",
    url: URL_EDIT_USER,
    data: userEdit,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
export const actAddUser = (user) => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  let userAdd = { ...user, maNhom: "GP09" };

  return axios({
    method: "POST",
    url: URL_ADD_USER,
    data: userAdd,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
const actGetListUserRequest = () => {
  return { type: ActionType.GET_LIST_USER_REQUEST };
};
const actGetListUserSuccess = (data) => {
  return {
    type: ActionType.GET_LIST_USER_SUCCESS,
    payload: data,
  };
};
const actGetListUserFailed = (error) => {
  return {
    type: ActionType.GET_LIST_USER_FAILED,
    payload: error,
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
const actSignUpSuccess = (data) => {
  return {
    type: ActionType.SIGN_UP_SUCCESS,
    payload: data,
  };
};
const actSignUpFailed = (err) => {
  return {
    type: ActionType.SIGN_UP_FAILED,
    payload: err,
  };
};
