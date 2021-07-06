import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import moment from "moment";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "gray",
    margin: "0 5px",
    color: "#FFF",
    padding: "5px 6px",
    borderRadius: "10px",
    "&.MuiButton-root": {
      transition: "0.5s",
    },
    "&.MuiButton-root:hover": {
      color: "#000",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    "& .MuiButton-label": {
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "0px",
    },
  },
}));

export default function Time({ item }) {
  const classes = useStyles();
  const [maLichChieu, setMaLichChieu] = useState();

  return (
    <Link to={`/ticket/${item.maLichChieu}`}>
      <Button
        className={classes.btn}
        onClick={() => console.log(item.maLichChieu)}
      >
        {moment(item.ngayChieuGioChieu).format("HH:mm A")}
      </Button>
    </Link>
  );
}
