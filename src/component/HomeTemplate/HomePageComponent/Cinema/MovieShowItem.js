import React from "react";
import { Card, CardHeader, Avatar, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import Day from "./Day";

const useStyles = makeStyles(() => ({
  header: {
    "&.MuiCardHeader-root": {
      overflow: "hidden",
      display: "block",
    },
  },
  avatar: {
    marginRight: "10px",
  },
  boxTitle: {
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    marginBottom: "10px",
    fontSize: "20px",
  },
  boxDay: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    minHeight: "40px",
  },
}));

export default function MovieShowItem({ detail }) {
  const classes = useStyles();
  let arrDay = [];
  const removeDuplicateDay = () => {
    let listDay = detail.lstLichChieuTheoPhim.map((item) =>
      new Date(item.ngayChieuGioChieu).toLocaleDateString()
    );
    arrDay = _.uniq(listDay);
    return arrDay.map((item, index) => (
      <Day key={index} day={item} listDay={detail.lstLichChieuTheoPhim} />
    ));
  };
  removeDuplicateDay();

  return (
    <Card>
      <CardHeader
        className={classes.header}
        title={
          <Box className={classes.boxTitle}>
            <Avatar
              alt={detail.tenPhim}
              src={detail.hinhAnh}
              className={classes.avatar}
            />
            {detail.tenPhim}
          </Box>
        }
        subheader={<Box className={classes.boxDay}>{removeDuplicateDay()}</Box>}
      />
    </Card>
  );
}
