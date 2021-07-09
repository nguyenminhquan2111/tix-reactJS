import ModalComponent from "component/HomeTemplate/Modal/Modal";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetListMovie } from "redux/actions/movieActions";
import Banner from "component/HomeTemplate/HomePageComponent/Banner/Banner";
import ShowingMovie from "component/HomeTemplate/HomePageComponent/ShowingMovie/ShowingMovie";
import Cinema from "component/HomeTemplate/HomePageComponent/Cinema/Cinema";
import "../mainSCSS/css/style.css";
import { actGetListMovieComing } from "redux/actions/movieActions";
import { actGetCinemaBrand } from "redux/actions/movieActions";
import Footer from "./../../../component/HomeTemplate/Footer/Footer";
import MovieApp from "component/HomeTemplate/HomePageComponent/MovieApp/MovieApp";
import Loader from "component/Loader";
export default function HomePage() {
  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      listMovie: state.movieReducer.listMovie,
      listMovieComing: state.movieReducer.listMovieComing,
      listCinemaBrand: state.movieReducer.listCinemaBrand,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetListMovie());
    dispatch(actGetListMovieComing());
    dispatch(actGetCinemaBrand());
  }, []);

  const { listMovie, listMovieComing, listCinemaBrand } = state;
  if (listMovie && listMovieComing && listCinemaBrand)
    return (
      <>
        <Banner listMovie={listMovie} />
        <ShowingMovie listMovie={listMovie} listMovieComing={listMovieComing} />
        <Cinema listCinemaBrand={listCinemaBrand} />
        <ModalComponent />
        <MovieApp />
        <Footer />
      </>
    );
  return <Loader />;
}
