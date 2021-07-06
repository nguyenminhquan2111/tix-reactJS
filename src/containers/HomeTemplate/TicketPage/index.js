import { Grid } from "@material-ui/core";
import Loader from "component/Loader";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetDetailTicketRoom } from "redux/actions/movieActions";
import DetailMovieInRoom from "component/HomeTemplate/TicketPageComponent/DetailMovie/DetailMovieInRoom";
import DetailRoom from "component/HomeTemplate/TicketPageComponent/DetailRoom/DetailRoom";

export default function TicketPage(props) {
  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      detailTicketRoom: state.movieReducer.detailTicketRoom,
    };
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    let idRoom = props.match.params.maLichChieu;
    dispatch(await actGetDetailTicketRoom(idRoom));
  }, []);
  const { isLoading, detailTicketRoom } = state;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid item xs={9} style={{ textAlign: "center" }}>
            <DetailRoom detailRoom={detailTicketRoom} />
          </Grid>
          <Grid item xs={3}>
            <DetailMovieInRoom detailRoom={detailTicketRoom} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
