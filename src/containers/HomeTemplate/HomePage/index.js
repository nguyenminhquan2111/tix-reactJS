import Footer from "component/HomeTemplate/Footer/Footer";
import ModalComponent from "component/HomeTemplate/Modal/Modal";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetListMovie } from "redux/actions/movieActions";
import Banner from "component/HomeTemplate/HomePageComponent/Banner/Banner";
import ShowingMovie from "component/HomeTemplate/HomePageComponent/ShowingMovie/ShowingMovie";
import Cinema from "component/HomeTemplate/HomePageComponent/Cinema/Cinema";
import Footer from "component/HomeTemplate/Footer/Footer";
import "../mainSCSS/css/style.css";
import { actGetListMovieComing } from "redux/actions/movieActions";

export default function HomePage() {
  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      listMovie: state.movieReducer.listMovie,
      listMovieComing: state.movieReducer.listMovieComing,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetListMovie());
    dispatch(actGetListMovieComing());
  }, []);

  const { listMovie, listMovieComing } = state;

  return (
    <>
      <Banner listMovie={listMovie} />
      <ShowingMovie listMovie={listMovie} listMovieComing={listMovieComing} />
      <Cinema />
      <ModalComponent />
      <Footer />
    </>
  );
}
