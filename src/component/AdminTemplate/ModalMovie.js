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
  actFetchListMovie,
  actAddMovie,
  actEditMovie,
} from "redux/actions/movieActions";
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

export default function ModalMovie(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, movieEdit } = props;
  let moment = require("moment");

  const [input, setInput] = useState({
    danhGia: "",
    hinhAnh: {},
    maNhom: "GP09",
    maPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    tenPhim: "",
    trailer: "",
  });
  const [error, setError] = useState({
    danhGia: "",
    hinhAnh: "",
    maPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    tenPhim: "",
    trailer: "",
  });
  const [validation, setValidation] = useState(false);
  useEffect(() => {
    if (movieEdit) {
      setInput({
        ...input,

        danhGia: movieEdit.danhGia,
        hinhAnh: movieEdit.hinhAnh,
        maNhom: "GP09",
        maPhim: movieEdit.maPhim,
        moTa: movieEdit.moTa,
        ngayKhoiChieu: moment(movieEdit.ngayKhoiChieu).format("YYYY-MM-DD"),
        tenPhim: movieEdit.tenPhim,
        trailer: movieEdit.trailer,
      });
      setValidation(true);
    } else {
      setInput({
        ...input,

        danhGia: "",
        hinhAnh: {},
        maPhim: "",
        moTa: "",
        ngayKhoiChieu: moment(new Date()).format("YYYY-MM-DD"),
        tenPhim: "",
        trailer: "",
      });
      setValidation(false);
    }
    setError({
      danhGia: "",
      hinhAnh: "",
      maPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      tenPhim: "",
      trailer: "",
    });
    console.log(input);
  }, [props.open]);
  const handleClose = () => {
    props.closeModal(false);
    setInput({
      biDanh: "",
      danhGia: "",
      hinhAnh: "",
      maNhom: "GP09",
      maPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      tenPhim: "",
      trailer: "",
    });
    setError({
      biDanh: "",
      danhGia: "",
      hinhAnh: "",
      maPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      tenPhim: "",
      trailer: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    props.closeModal(false);
    let form_data = new FormData();
    let ngayKhoiChieu = moment(input.ngayKhoiChieu).format("DD/MM/YYYY");
    let maPhim = parseInt(input.maPhim, 10);
    let danhGia = parseInt(input.danhGia, 10);
    let data = {
      ...input,
      maNhom: "GP09",
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const i in data) {
      console.log(i, data[i]);
      form_data.append(i, data[i]);
    }
    if (movieEdit) {
      actEditMovie(form_data)
        .then((result) => {
          Swal.fire("Sửa phim thành công !", "Nhấn OK để thoát!", "success");
          dispatch(actFetchListMovie());
        })
        .catch((error) => {
          Swal.fire("Sửa không phim thành công !", "Nhấn OK để thoát", "error");
        });
    } else {
      actAddMovie(form_data)
        .then((result) => {
          Swal.fire("Thêm phim thành công !", "Nhấn OK để thoát!", "success");
          dispatch(actFetchListMovie());
        })
        .catch((error) => {
          Swal.fire(
            "Thêm phim không thành công !",
            error.response.data,
            "error"
          );
        });
    }
    handleClose();
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    if (name === "hinhAnh") {
      setInput({ ...input, hinhAnh: e.target.files[0] }, console.log(input));
    } else
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
      case "maPhim":
        let pattern = "^(0|[1-9][0-9]*)$";
        if (value && value.length !== 4) mess = "Mã phim phải là 4 chữ số";
        if (value && !value.match(pattern)) mess = "Vui lòng chỉ nhập số";

        break;

      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });

    const { danhGia, hinhAnh, maPhim, moTa, ngayKhoiChieu, tenPhim, trailer } =
      input;
    if (
      danhGia &&
      hinhAnh &&
      maPhim &&
      moTa &&
      ngayKhoiChieu &&
      tenPhim &&
      trailer
    )
      setValidation(true);
    else setValidation(false);
    console.log({ input, error, validation });
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {movieEdit ? "Chỉnh sửa phim" : " Thêm phim"}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.tenPhim}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Tên phim"
              variant="outlined"
              onChange={handleOnchange}
              name="tenPhim"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.tenPhim !== ""}
              helperText={error.tenPhim}
            />
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.moTa}
              fullWidth
              className={classes.input}
              id="outlined-multiline-static"
              label="Mô tả"
              multiline
              rows={4}
              variant="outlined"
              onChange={handleOnchange}
              name="moTa"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.moTa !== ""}
              helperText={error.moTa}
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="hinhAnh"
              onChange={handleOnchange}
            />

            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.maPhim}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Mã phim"
              variant="outlined"
              onChange={handleOnchange}
              name="maPhim"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.maPhim !== ""}
              helperText={error.maPhim}
            />

            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.danhGia}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Đánh gái"
              variant="outlined"
              onChange={handleOnchange}
              name="danhGia"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.danhGia !== ""}
              helperText={error.danhGia}
              select
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </TextField>

            <TextField
              label="Ngày khởi chiếu"
              type="date"
              value={input.ngayKhoiChieu}
              onChange={handleOnchange}
              name="ngayKhoiChieu"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              value={input.trailer}
              fullWidth
              className={classes.input}
              id="outlined-basic"
              label="Trailer"
              variant="outlined"
              onChange={handleOnchange}
              name="trailer"
              onKeyUp={handleError}
              onBlur={handleError}
              error={error.trailer !== ""}
              helperText={error.trailer}
            />
            {movieEdit ? (
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
                Thêm phim
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
