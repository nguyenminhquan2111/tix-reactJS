import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import MovieItem from "../MovieItem/MovieItem";

const ListContainer = styled.div`
  display:none;
  @media (min-width: 768px) {
    display: block;
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
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) {
    display: none;
  }
`;
const BtnViewMore = styled.div`
  cursor: pointer;
  margin: 0 auto;
  max-width: 6rem;
  color: grey;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.4rem;
  &.show {
    display: block;
  }
  &.hidden {
    display: none;
  }
`;

export default function ListMovie({ ...props }) {
  const [number, setNumber] = useState(3);

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

  const listMovie = props.listMovie;

  const renderListMovie = () => {
    return (
      listMovie &&
      listMovie.map((item) => {
        return <MovieItem key={item.maPhim} movie={item} status="nowShowing" />;
      })
    );
  };

  const renderListMovieMobile = () => {
    return (
      listMovie &&
      [...listMovie].splice(0, number).map((item) => {
        return <MovieItem key={item.maPhim} movie={item} status="nowShowing" />;
      })
    );
  };

  return (
    <>
      <ListContainer>
        <Slider {...settingSlick}>{renderListMovie()}</Slider>
      </ListContainer>
      <ListMobile>
        {renderListMovieMobile()}
        <BtnViewMore
          variant="outlined"
          className={
            listMovie && +number >= +listMovie.length ? "hidden" : "show"
          }
          onClick={() => {
            setNumber(number + 5);
          }}
        >
          View More
        </BtnViewMore>
      </ListMobile>
    </>
  );
}
