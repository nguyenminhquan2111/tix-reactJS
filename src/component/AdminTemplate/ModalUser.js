import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import {
  actAddUser,
  actEditUser,
  actFetchListUser,
} from "redux/actions/userActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  input: {
    margin: "10px 0",
  },
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ModalUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, userEdit } = props;

  const [input, setInput] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP09",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [error, setError] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [validation, setValidation] = useState(false);
  useEffect(() => {
    if (userEdit) {
      setInput({
        ...input,
        taiKhoan: userEdit.taiKhoan,
        matKhau: userEdit.matKhau,
        email: userEdit.email,
        soDt: userEdit.soDt,
        maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
        hoTen: userEdit.hoTen,
      });
      setValidation(true);
    } else {
      setInput({
        ...input,
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maLoaiNguoiDung: "",
        hoTen: "",
      });
      setValidation(false);
    }
    console.log(input);
    setError({
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    });
  }, [props.open]);
  const handleClose = () => {
    props.closeModal(false);
    setInput({
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP09",
      maLoaiNguoiDung: "",
      hoTen: "",
    });
    setError({
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    props.closeModal(false);
    if (userEdit) {
      actEditUser(input)
        .then((result) => {
          Swal.fire(
            "Sửa tài khoản thành công!",
            "Nhấn OK để thoát!",
            "success"
          );
          dispatch(actFetchListUser());
        })
        .catch((error) => {
          console.log({ ...error });

          Swal.fire(
            "Sửa tài khoản không thành công !",
            error.response.data,
            "error"
          );
        });
    } else {
      actAddUser(input)
        .then((result) => {
          Swal.fire(
            "Tạo tài khoản thành công!",
            "Nhấn OK để thoát!",
            "success"
          );
          dispatch(actFetchListUser());
        })
        .catch((error) => {
          Swal.fire(
            "Tạo tài khoản không thành công !",
            error.response.data,
            "error"
          );
        });
    }
    handleClose();
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log({ name, value });
  };
  const handleError = (e) => {
    const { name, value } = e.target;
    let mess = "";
    mess = value === "" ? name + " khong duoc rong" : "";
    console.log({ name, value, mess });
    switch (name) {
      case "taiKhoan":
        break;
      case "matKhau":
        break;
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
      case "maLoaiNguoiDung":
        break;
      case "hoTen":
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });

    const { taiKhoan, matKhau, email, soDt, maLoaiNguoiDung, hoTen } = input;
    if (taiKhoan && matKhau && email && soDt && maLoaiNguoiDung && hoTen)
      setValidation(true);
    else setValidation(false);
    console.log({ input, error, validation });
  };
  const handleChange = (event) => {
    setInput({
      ...input,
      maLoaiNguoiDung: event.target.value,
    });
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {userEdit ? "Chỉnh sửa người dùng" : " Thêm người dùng"}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.taiKhoan}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Tài khoản"
              variant="outlined"
              onChange={handleOnchange}
              name="taiKhoan"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.taiKhoan !== ""}
              helperText={error.taiKhoan}
            />

            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.matKhau}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              onChange={handleOnchange}
              name="matKhau"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.matKhau !== ""}
              helperText={error.matKhau}
            />
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.email}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={handleOnchange}
              name="email"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.email !== ""}
              helperText={error.email}
            />
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.soDt}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={handleOnchange}
              name="soDt"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.soDt !== ""}
              helperText={error.soDt}
            />

            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.maLoaiNguoiDung}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Mã loại người dùng"
              variant="outlined"
              onChange={handleOnchange}
              name="maLoaiNguoiDung"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.maLoaiNguoiDung !== ""}
              helperText={error.maLoaiNguoiDung}
              select
            >
              <MenuItem value="KhachHang">Khách hàng</MenuItem>
              <MenuItem value="QuanTri">Quản trị</MenuItem>
            </TextField>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.hoTen}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Họ tên"
              variant="outlined"
              onChange={handleOnchange}
              name="hoTen"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.hoTen !== ""}
              helperText={error.hoTen}
            />
            {userEdit ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!validation}
              >
                Lưu thay đổi
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!validation}
              >
                Thêm người dùng
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
