import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListMovie } from "./modules/actions";
import MovieItem from "../MovieItem/MovieItem";
import Slider from "react-slick";

export default function ListMovie() {
  const state = useSelector((state) => {
    return {
      isLoading: state.listMovieReducer.loading,
      data: state.listMovieReducer.data,
    };
  });

  const dispatch = useDispatch();

  const fetchListMovie = () => {
    dispatch(actFetchListMovie());
  };

  useEffect(() => {
    fetchListMovie();
  }, []);

  const ref = useRef({});
  const next = () => {
    ref.current.slickNext();
  };

  const prev = () => {
    ref.current.slickPrev();
  };

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderListMovie = () => {
    const { data } = state;
    return (
      data &&
      data.map((item) => {
        return <MovieItem key={item.maPhim} movie={item} />;
      })
    );
  };

  return (
    <section className="container-fluid list__movie" id="lichChieu">
      <div className="container list__movie__container">
        <Slider ref={ref} {...settingSlick}>
          {renderListMovie()}
        </Slider>
      </div>
    </section>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     isLoading: state.listMovieReducer.loading,
//     data: state.listMovieReducer.data,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchListMovie: () => {
//       dispatch(actFetchListMovie());
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ListMovie);
