import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListMovieComing } from "./modules/actions";
import MovieItem from "../MovieItem/MovieItem";
import Slider from "react-slick";
import styled from "styled-components";
// import { Container } from "@material-ui/core";

const ListContainer = styled.div`
  display:none;
  @media (min-width: 768px) {
    display:  block;
  }
  & .list__movie__slider {
    .slick-prev {
      left: -50px;
      top: 50%;
      &::before {
        font-family: "Font Awesome 5 Free";
        content: "\f053";
        font-size: 3rem;
      }
    }
    .slick-next {
      top: 50%;
      right: -40px;
      &::before {
        font-family: "Font Awesome 5 Free";
        content: "\f054";
        font-size: 3rem;
      }
    }

    button {
      &::before {
        color: gray;
        opacity: 1;
        font-size: 4rem;
        font-weight: bold;
        line-height: 0;
      }
     
  }
`;

const ListMobile = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function ListMovieComing() {
  const state = useSelector((state) => {
    return {
      isLoading: state.listMovieComingReducer.loading,
      data: state.listMovieComingReducer.data,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListMovieComing());
  }, []);

  const settingSlick = {
    className: "list__movie__slider",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    slidesPerRow: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const renderListMovieComing = () => {
    const { data } = state;
    return (
      data &&
      data.map((item) => {
        return <MovieItem key={item.maPhim} movie={item} status="coming" />;
      })
    );
  };

  return (
    <>
      <ListContainer>
        <Slider {...settingSlick}>{renderListMovieComing()}</Slider>
      </ListContainer>
      <ListMobile>{renderListMovieComing()}</ListMobile>
    </>
  );
}
