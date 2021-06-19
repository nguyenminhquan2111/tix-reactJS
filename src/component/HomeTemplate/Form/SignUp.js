import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

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
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actSignUp(state, props.history));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <p className="title">USERNAME</p>
          <input name="taiKhoan" onChange={handleOnChange} />
        </div>
        <div>
          <p className="title">PASSWORD</p>
          <input type="password" name="matKhau" onChange={handleOnChange} />
        </div>
        <div>
          <p className="title">NAME</p>
          <input name="hoTen" onChange={handleOnChange} />
        </div>
        <div>
          <p className="title">EMAIL ADDRESS</p>
          <input name="email" onChange={handleOnChange} />
        </div>
        <div>
          <p className="title">PHONE NUMBER</p>
          <input name="soDt" onChange={handleOnChange} />
        </div>

        <Button type="submit" variant="contained" className="buttonForm">
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
