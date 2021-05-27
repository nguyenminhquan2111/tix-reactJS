/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CinemaBrandItem from "./CinemaBrand/CinemaBrandItem";
import styled from "styled-components";
import CinemaByBrandItem from "./CinemaByBrand/CinemaByBrandItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  actGetCinemaBrand,
  actGetListCinemaByBrand,
} from "redux/actions/movieActions";

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
const CinemaBrandContainer = styled(Tabs)`
  display: flex;
  height: 700px;
  overflow-y: hidden;
`;
const CinemaBrand = styled(Tab)`
  cursor: pointer;
  padding: 0;
  opacity: 0.5;
  &:hover,
  &.react-tabs__tab--selected {
    opacity: 1;
  }
`;
const CinemaBrandList = styled(TabList)`
  border: 1px solid #ebebec;
`;
const CinemaByBrandList = styled(TabPanel)`
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

export default function Cinema() {
  const [idCinemaBrand, setIdCinemaBrand] = useState("BHDStar");
  const [cinemaLogo, setCinemaLogo] = useState(
    "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
  );

  const state = useSelector((state) => {
    return {
      isLoading: state.movieReducer.loading,
      listCinemaBrand: state.movieReducer.listCinemaBrand,
      listCinemaByBrand: state.movieReducer.listCinemaByBrand,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetCinemaBrand());
  }, []);

  useEffect(() => {
    dispatch(actGetListCinemaByBrand(idCinemaBrand));
  }, [idCinemaBrand]);

  const { listCinemaBrand, listCinemaByBrand } = state;

  console.log("data", listCinemaBrand);
  console.log("cinemaBrand", idCinemaBrand);
  console.log("CinemaByBrand", listCinemaByBrand);

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
          <CinemaByBrandItem
            key={index}
            cinemaByBrand={item}
            cinemaLogo={cinemaLogo}
          />
        );
      })
    );
  };

  return (
    <CinemaBrandWrapper id="cumRap">
      <CinemaBrandContainer>
        <CinemaBrandList>{renderCinemaBrand()}</CinemaBrandList>
        <CinemaByBrandList forceRender={true}>
          {renderCinemaByBrand()}
        </CinemaByBrandList>
      </CinemaBrandContainer>
    </CinemaBrandWrapper>
  );
}
