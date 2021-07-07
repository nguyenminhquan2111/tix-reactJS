/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CinemaBrandItem from "./CinemaBrandItem";
import styled from "styled-components";
import CinemaByBrandItem from "./CinemaByBrandItem";
import { actGetListCinemaByBrand } from "redux/actions/movieActions";
import { actGetListMovieCinema } from "redux/actions/movieActions";
import MovieShowItem from "./MovieShowItem";

const WrapperTopBot = styled.div`
  height: 120px;
  background: url(https://tix.vn/app/assets/img/icons/back-news.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;
const CinemaBrandWrapper = styled.section`
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    max-width: 60%;
  }
  @media (min-width: 1500px) {
    max-width: 50%;
  }
`;
const CinemaBrandContainer = styled.div`
  display: flex;
  height: 700px;
  overflow-y: hidden;
  margin-bottom: 20px;
`;
const CinemaBrand = styled.div`
  cursor: pointer;
  padding: 0;
  opacity: 0.5;
  &:hover,
  &.react-tabs__tab--selected {
    opacity: 1;
  }
`;
const CinemaBrandList = styled.div`
  border: 1px solid #ebebec;
  width: 10%;
`;
const CinemaByBrandList = styled.div`
  border-top: 1px solid #ebebec;
  border-bottom: 1px solid #ebebec;
  width: 35%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #e8e3e3;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
`;
const MovieCinema = styled.div`
  border-top: 1px solid #ebebec;
  border-bottom: 1px solid #ebebec;
  width: 55%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #e8e3e3;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
`;

export default function Cinema(props) {
  const [idCinemaBrand, setIdCinemaBrand] = useState("BHDStar");
  const [cinemaLogo, setCinemaLogo] = useState(
    "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
  );
  const [maCumRap, setMaCumRap] = useState("");

  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      listCinemaByBrand: state.movieReducer.listCinemaByBrand,
      listMovieCinema: state.movieReducer.listMovieCinema,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetListCinemaByBrand(idCinemaBrand));
    dispatch(actGetListMovieCinema(idCinemaBrand));
  }, [idCinemaBrand]);

  const { listCinemaByBrand, listMovieCinema } = state;
  const { listCinemaBrand } = props;

  const renderCinemaBrand = () => {
    return (
      listCinemaBrand &&
      listCinemaBrand.map((item, index) => {
        return (
          <CinemaBrand
            key={index}
            onClick={() => {
              setCinemaLogo(item.logo);
              setIdCinemaBrand(item.maHeThongRap);
            }}
          >
            <CinemaBrandItem cinemaBrand={item} />
          </CinemaBrand>
        );
      })
    );
  };

  const renderCinemaByBrand = () => {
    return (
      listCinemaByBrand &&
      listCinemaByBrand.map((item, index) => {
        return (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => setMaCumRap(item.maCumRap)}
          >
            <CinemaByBrandItem cinemaByBrand={item} cinemaLogo={cinemaLogo} />
          </div>
        );
      })
    );
  };

  const renderMovieCinema = () => {
    let theater = [];
    let listMovie = [];

    if (maCumRap && listMovieCinema) {
      theater = listMovieCinema.map((item) =>
        item.lstCumRap.find((theater) => theater.maCumRap === maCumRap)
      );
      if (theater) {
        listMovie = theater.map(
          (movie) => movie && movie.danhSachPhim.map((listMovie) => listMovie)
        );
        if (listMovie[0]) {
          return listMovie[0].map((item, index) => (
            <MovieShowItem
              key={index}
              detail={item}
              onClick={() => console.log(item)}
            />
          ));
        }
      }
    }
    return <></>;
  };

  return (
    <CinemaBrandWrapper>
      <WrapperTopBot></WrapperTopBot>
      <CinemaBrandContainer>
        <CinemaBrandList>{renderCinemaBrand()}</CinemaBrandList>
        <CinemaByBrandList>{renderCinemaByBrand()}</CinemaByBrandList>
        <MovieCinema>{renderMovieCinema()}</MovieCinema>
      </CinemaBrandContainer>
      <WrapperTopBot></WrapperTopBot>
    </CinemaBrandWrapper>
  );
}
