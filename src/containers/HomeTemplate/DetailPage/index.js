import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetDetailMovie } from "redux/actions/movieActions";

import DetailTop from "./../../../component/HomeTemplate/DetailPageComponent/DetailTop/DetailTop";
import DetailMiddle from "./../../../component/HomeTemplate/DetailPageComponent/DetailMiddle/DetailMiddle";
import Footer from "component/HomeTemplate/Footer/Footer";
import ModalComponent from "./../../../component/HomeTemplate/DetailPageComponent/Modal/Modal";
import Loader from "component/Loader";

export default function DetailPage(props) {
  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      data: state.movieReducer.detailMovie,
    };
  });
  const { isLoading, data } = state;
  console.log(data);
  const { id } = props.match.params;
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetDetailMovie(id));
  }, []);
  const renderDetailMovie = () => {
    if (isLoading) return <Loader />;
    if (data)
      return (
        <>
          <DetailTop movie={data} />
          <DetailMiddle movie={data} />
          <Footer />
          <ModalComponent trailerFlim={data.trailer} />
        </>
      );
    return <></>;
  };
  return <>{renderDetailMovie()}</>;
}
