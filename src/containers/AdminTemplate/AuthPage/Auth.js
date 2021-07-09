import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { actAuth } from "redux/actions/userActions";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    margin: "0.5rem 0",
  },
});
const AuthContainer = styled.div`
  background-image: url(/images/form.jpg);
  background-size: contain;
  background-position: center;
  width: 100vw;
  max-width: 100%;
  height: 50rem;
`;
const CardStyled = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonStyled = styled(Button)`
  margin: 0 auto !important;
`;
const TitleAuth = styled.h1`
  font-size: 1.5rem;
  display: block;
  padding: 16px 16px 0 16px;
  margin: 0;
  color: #3f51b5;
`;
export default function Auth(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [taiKhoanError, setTaiKhoanError] = useState(false);
  const [matKhauError, setMatKhauError] = useState(false);
  const [taiKhoanHelperText, setTaiKhoanHelperText] = useState("");
  const [matKhauHelperText, setMatKhauHelperText] = useState("");
  const error = useSelector((state) => state.userReducer.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaiKhoanError(false);
    setMatKhauError(false);
    setTaiKhoanHelperText("");
    setMatKhauHelperText("");
    if (taiKhoan === "") {
      setTaiKhoanError(true);
      setTaiKhoanHelperText("Bạn phải nhập tài khoản");
    }
    if (matKhau === "") {
      setMatKhauError(true);
      setMatKhauHelperText("Bạn phải nhập mật khẩu");
    }
    if (taiKhoan && matKhau) {
      console.log({ taiKhoan, matKhau });
    }
    if (taiKhoanError || matKhauError) return;
    dispatch(actAuth({ taiKhoan, matKhau }, props.history));
    if (error) {
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
    }
  };
  return (
    <AuthContainer>
      <CardStyled className={classes.root}>
        <TitleAuth>Đăng Nhập</TitleAuth>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              onChange={(e) => setTaiKhoan(e.target.value)}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              required
              fullWidth
              error={taiKhoanError}
              helperText={taiKhoanHelperText}
            />
            <TextField
              type="password"
              className={classes.textField}
              onChange={(e) => setMatKhau(e.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
              fullWidth
              error={matKhauError}
              helperText={matKhauHelperText}
            />
            <ButtonStyled
              type="submit"
              variant="contained"
              color="primary"
              fullWidth="true"
            >
              Đăng nhập
            </ButtonStyled>
          </form>
        </CardContent>
      </CardStyled>
    </AuthContainer>
  );
}
