import React from "react";

export default function MovieItem(props) {
  const { movie } = props;
  return (
    <div className="movie__item">
      <img
        className="movie__item__img"
        src={movie.hinhAnh}
        alt={movie.tenPhim}
      />
      <div className="movie__item__content">
        <div className="movie__item__name">{movie.tenPhim}</div>
        <p className="movie__item__time">thời lượng - {movie.danhGia}/10</p>
      </div>
    </div>
  );
}
