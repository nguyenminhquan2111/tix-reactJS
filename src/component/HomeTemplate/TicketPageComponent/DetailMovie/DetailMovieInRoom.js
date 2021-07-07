import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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
    fontSize: "20px",
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
}));

export default function DetailMovieInRoom({ detailRoom }) {
  // console.log("DetailMovieInRoom", detailRoom);
  const listBookingChair = useSelector(
    (state) => state.movieReducer.listBookingChair
  );
  let history = useHistory();
  const classes = useStyles();
  const handleOnClick = () => {
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
      history.push("");
    }, 2500);
  };
  return (
    <>
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
        Ghế:
        {listBookingChair.map((item, index) => (
          <span className={classes.chairNumber} key={index}>
            {item.stt}
          </span>
        ))}
      </Box>
      <hr />
      <Button fullWidth variant="contained" onClick={handleOnClick}>
        Đặt vé
      </Button>
    </>
  );
}
