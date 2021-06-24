import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const currencies = [
  {
    value: "quanTri",
    label: "Quản trị",
  },
  {
    value: "khacHang",
    label: "Khách hàng",
  },
];
export default function ModalUser() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("");

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP09",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrency("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setOpen(false);
    setCurrency("");
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddCircleIcon />}
      >
        Thêm người dùng
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Thêm người dùng
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Tài khoản"
              variant="outlined"
              onChange={handleOnchange}
              name="taiKhoan"
            />
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              onChange={handleOnchange}
              name="matKhau"
            />
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={handleOnchange}
              name="email"
            />
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={handleOnchange}
              name="soDt"
            />
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-select-currency"
              select
              value={currency}
              label="Mã loại người dùng"
              onChange={handleOnchange}
              name="maLoaiNguoiDung"
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    setCurrency(option.value);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Họ tên"
              variant="outlined"
              onChange={handleOnchange}
              name="hoTen"
            />
            <Button type="submit" color="primary">
              Thêm
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
