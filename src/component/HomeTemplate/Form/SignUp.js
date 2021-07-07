import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";

import { actSignUp } from "redux/actions/userActions";
export default function SignUp(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP09",
    maLoaiNguoiDung: "KhachHang",
  });
  const [error, setError] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
  });
  const [validation, setValidation] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState(
      {
        ...state,
        [name]: value,
      },
      console.log(state)
    );
  };
  const handleError = (e) => {
    const { name, value } = e.target;
    let mess = "";
    mess = value === "" ? name + " không được rỗng" : "";
    console.log({ name, value, mess });
    switch (name) {
      case "email":
        if (value && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          mess = "Vui lòng nhập đúng email.";
        }
        break;
      case "soDt":
        if (value && !value.match(/([1-9][0-9]*)|0/)) {
          mess = "Vui lòng chỉ nhập số,";
        }
        break;
      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });
    const { taiKhoan, matKhau, email, hoTen, soDt } = state;
    if (taiKhoan && matKhau && email && hoTen && soDt) setValidation(true);
    else setValidation(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actSignUp(state, props.history));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <TextField
            onChange={handleOnChange}
            name="taiKhoan"
            label="Tài khoản"
            variant="filled"
            fullWidth
            size="small"
            onKeyUp={handleError}
            onBlur={handleError}
            error={error.taiKhoan !== ""}
            helperText={error.taiKhoan}
          />
        </div>
        <div className="inputContainer">
          <TextField
            type="password"
            onChange={handleOnChange}
            name="matKhau"
            label="Mật Khẩu"
            variant="filled"
            fullWidth
            size="small"
            onKeyUp={handleError}
            onBlur={handleError}
            error={error.matKhau !== ""}
            helperText={error.matKhau}
          />
        </div>
        <div className="inputContainer">
          <TextField
            onChange={handleOnChange}
            name="hoTen"
            label="Họ Tên"
            variant="filled"
            fullWidth
            size="small"
            onKeyUp={handleError}
            onBlur={handleError}
            error={error.hoTen !== ""}
            helperText={error.hoTen}
          />
        </div>
        <div className="inputContainer">
          <TextField
            onChange={handleOnChange}
            name="email"
            label="Email"
            variant="filled"
            fullWidth
            size="small"
            onKeyUp={handleError}
            onBlur={handleError}
            error={error.email !== ""}
            helperText={error.email}
          />
        </div>
        <div className="inputContainer">
          <TextField
            onChange={handleOnChange}
            name="soDt"
            label="Số điện thoại"
            variant="filled"
            fullWidth
            size="small"
            onKeyUp={handleError}
            onBlur={handleError}
            error={error.soDt !== ""}
            helperText={error.soDt}
          />
        </div>

        <Button
          disabled={!validation}
          type="submit"
          variant="contained"
          className="buttonForm"
        >
          Submit
        </Button>
        <Link to={"/"}>
          <Button variant="contained" className="buttonForm">
            Back To Home
          </Button>
        </Link>
      </form>
    </div>
  );
}
