import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { actGetBookingChair } from "redux/actions/movieActions";

const useStyles = makeStyles(() => ({
  totalPrice: {
    textAlign: "center",
    color: "green",
    fontSize: "50px",
    fontWeight: "600",
  },
  titleMovie: {
    color: "#000",
    fontWeight: "600",
    fontSize: "30px",
  },
  roomDetail: {
    fontWeight: "500",
    color: "grey",
    fontSize: "15px",
  },
  chair: {
    color: "red",
    fontSize: "20px",
    fontWeight: "500",
    display: "flex",
    flexWrap: "wrap",
  },
  chairNumber: {
    marginRight: "5px",
    fontSize: "20px",
    fontWeight: "500",
  },
  btn: {
    backgroundColor: "green",
    color: "#FFF",
  },
  alert: {
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "400",
    marginBottom: "5px",
    "& span": {
      color: "red",
      fontSize: "13px",
    },
  },
}));

export default function DetailMovieInRoom({ detailRoom }) {
  const listBookingChair = useSelector(
    (state) => state.movieReducer.listBookingChair
  );
  const dispatch = useDispatch();

  let history = useHistory();
  const classes = useStyles();
  const handleOnClick = () => {
    if (JSON.parse(localStorage.getItem("UserCustomer")) === null) {
      history.push("/login");
    } else {
      dispatch(actGetBookingChair([]));
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        showCloseButton: true,
        icon: "success",
        title: "Đặt vé thành công",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      setTimeout(() => {
        history.push("/");
      }, 2500);
    }
  };

  useEffect(() => {
    dispatch(() => actGetBookingChair([]));
  }, []);
  return (
    <>
      <Box>
        <Box className={classes.totalPrice}>
          {listBookingChair
            .reduce((total, item, index) => (total += item.giaVe), 0)
            .toLocaleString() + " đ"}
        </Box>
        <hr />
        <Typography component="h1" className={classes.titleMovie}>
          {detailRoom?.thongTinPhim.tenPhim}
        </Typography>
        <Typography component="h3" className={classes.roomDetail}>
          {`${detailRoom?.thongTinPhim.tenCumRap} - ${detailRoom?.thongTinPhim.tenRap}`}
        </Typography>
        <Typography component="h3" className={classes.roomDetail}>
          {`${detailRoom?.thongTinPhim.ngayChieu} - ${detailRoom?.thongTinPhim.gioChieu}`}
        </Typography>
        <hr />
        <Box className={classes.chair}>
          Ghế:{" "}
          {listBookingChair.map((item, index) => (
            <span className={classes.chairNumber} key={index}>
              {item.stt}
            </span>
          ))}
        </Box>
        <hr />
      </Box>
      <Box>
        <Typography className={classes.alert}>
          Vé đã mua không thể đổi hoặc hoàn tiền
          <br />
          Mã vé sẽ được gửi qua <span>ZMS</span> (tin nhắn Zalo) <br /> và{" "}
          <span>Email</span> đã nhập
        </Typography>

        <Button
          disabled={listBookingChair.length > 0 ? false : true}
          fullWidth
          variant="contained"
          onClick={handleOnClick}
          className={classes.btn}
        >
          Đặt vé
        </Button>
      </Box>
    </>
  );
}
