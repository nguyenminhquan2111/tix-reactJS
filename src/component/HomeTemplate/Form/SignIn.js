import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Checkbox from "@material-ui/core/Checkbox";
import { actLogin } from "redux/actions/userActions";
import Container from "@material-ui/core/Container";
import Loader from "component/Loader";
import TextField from "@material-ui/core/TextField";

export default function SignIn(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ taiKhoan: "", matKhau: "" });
  const [checked, setChecked] = useState(false);
  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (state.taiKhoan === "" && state.matKhau === "") {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        showCloseButton: true,
        icon: "error",
        title: "Bạn phải nhập tài khoản và mật khẩu",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }
    if (state.taiKhoan === "") {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        showCloseButton: true,
        icon: "error",
        title: "Bạn phải nhập tài khoản",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }
    if (state.matKhau === "") {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        showCloseButton: true,
        icon: "error",
        title: "Bạn phải nhập mật khẩu",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }
    dispatch(actLogin(state, props.history));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="inputContainer">
          <TextField
            onChange={handleOnChange}
            name="taiKhoan"
            label="Tài khoản"
            variant="filled"
            required
            fullWidth
            size="small"
          />
        </div>
        <div className="inputContainer">
          <TextField
            type="password"
            onChange={handleOnChange}
            name="matKhau"
            label="Mật khẩu"
            variant="filled"
            required
            fullWidth
            type={checked ? "text" : "password"}
            size="small"
          />
        </div>
        <div className="checkBoxContainer">
          <Checkbox
            checked={checked}
            onChange={handleChangeChecked}
            color="primary"
            inputProps={{ "aria-label": "secondary  checkbox" }}
          />
          <span className="checkBoxContent">Hiện mật khẩu</span>
        </div>

        <Button type="submit" variant="contained" className="buttonForm">
          Đăng nhập
        </Button>
        <Link to={"/"}>
          <Button variant="contained" className="buttonForm">
            Về trang chủ
          </Button>
        </Link>
      </form>
    </div>
  );
}
