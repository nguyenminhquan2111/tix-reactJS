import React from "react";
import { Button, Box, Popover, makeStyles } from "@material-ui/core";
import Time from "./Time";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: "0 5px",
    marginRight: "5px",
    marginBottom: "5px",
    borderRadius: "8px",
    backgroundColor: "#E4E6F0",
  },
  popover: {
    "& .MuiPaper-rounded": {
      marginTop: "5px",
      borderRadius: "8px",
      overflow: "hidden",
      padding: "10px",
    },
  },
  boxTime: {
    minHeight: "50px",
    minWidth: "200px",
  },
}));

export default function Day({ day, listDay }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const renderTime = () => {
    if (listDay) {
      let arr = listDay.filter(
        (item) => new Date(item.ngayChieuGioChieu).toLocaleDateString() === day
      );
      return arr.map((item, index) => <Time key={index} item={item} />);
    }
    return <></>;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        className={classes.btn}
      >
        {moment(day.slice(0, -5)).format("DD/MM")}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box className={classes.boxTime}>{renderTime()}</Box>
      </Popover>
    </div>
  );
}
