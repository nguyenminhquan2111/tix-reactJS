/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import { actGetDetailMovie } from "redux/actions/movieActions";
import SkeletonCaption from "component/Skeleton/SkeletonCaption";
import moment from "moment";
import { useHistory } from "react-router";

const Tools = styled.div`
  position: absolute;
  background-color: white;
  width: 70%;
  height: 80px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border-radius: 5px;
  z-index: 999;
  display: none;
  align-items: center;
  & > div > div {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > div > div i {
    color: grey;
  }
  @media (min-width: 997px) {
    display: flex;
  }
`;
const Select = styled.div`
  cursor: pointer;
`;
const Title = styled.li`
  max-width: 8rem;
  font-weight: 500;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TitleMovie = styled.li`
  max-width: 12rem;
  font-weight: 500;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const List = styled.ul`
  background-color: white;
  min-width: 200px;
  max-height: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  top: 120%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
  &.active {
    visibility: visible;
    opacity: 1;
    top: 100%;
  }
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
const MenuItem = styled.li`
  padding: 0.2rem 1rem;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;
//Movie
const SelectMovieContainer = styled.div`
  flex: 3;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;
//Cinema,Date,Session
const SelectContainer = styled.div`
  flex: 2;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;

//Confirm
const ConfirmContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;
const ButtonConfirm = styled.button`
  font-size: 0.8rem;
  color: #fff;
  background-color: #4a4a4a;
  padding: 0.2rem 1rem;
  border-radius: 5px;
  @media (min-width: 1100px) {
    font-size: 1rem;
  }
`;

export default function BookingTools(props) {
  let history = useHistory();
  const [click, setClick] = useState({
    movie: false,
    cinema: false,
    date: false,
    session: false,
  });

  const titleArr = ["Phim", "Rạp", "Ngày xem", "Suất chiếu"];
  const [title, setTitle] = useState({
    movie: titleArr[0],
    cinema: titleArr[1],
    date: titleArr[2],
    session: titleArr[3],
  });

  const [movieId, setMovieId] = useState("");
  const [maLichChieu, setMaLichChieu] = useState("");

  const state = useSelector((state) => {
    return {
      loading: state.movieReducer.loading,
      detailMovie: state.movieReducer.detailMovie,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetDetailMovie(movieId));
  }, [movieId]);

  const { detailMovie, loading } = state;
  const listMovie = props.listMovie;

  const renderListMovie = () => {
    return (
      listMovie &&
      listMovie.map((item, index) => {
        return (
          <MenuItem
            key={index}
            onClick={() => {
              setMovieId(item.maPhim);
              setClick({ movie: false });
              setTitle({
                movie: item.tenPhim,
                cinema: titleArr[1],
                date: titleArr[2],
                session: titleArr[3],
              });
            }}
          >
            {item.tenPhim}
          </MenuItem>
        );
      })
    );
  };

  const renderListCinema = () => {
    let list = [];
    if (loading) {
      return (
        <li style={{ padding: "0.2rem 1rem", whiteSpace: "nowrap" }}>
          <SkeletonCaption />
          <SkeletonCaption />
          <SkeletonCaption />
          <SkeletonCaption />
          <SkeletonCaption />
        </li>
      );
    }
    if (detailMovie && detailMovie.lichChieu.length === 0) {
      return <MenuItem>Chưa có thông tin</MenuItem>;
    }
    if (detailMovie && detailMovie.lichChieu) {
      list = detailMovie.lichChieu.map((item) => {
        return item.thongTinRap.tenCumRap;
      });
    }
    list = _.uniq(list);
    return list.sort().map((item, index) => {
      return (
        <MenuItem
          onClick={() => {
            setClick({ cinema: false });
            setTitle({
              ...title,
              cinema: item,
              date: titleArr[2],
              session: titleArr[3],
            });
          }}
          key={index}
        >
          {item}
        </MenuItem>
      );
    });
  };

  const renderListDate = () => {
    let list = [];
    if (detailMovie && title.cinema !== "Rạp") {
      list = detailMovie.lichChieu.filter((item) => {
        return item.thongTinRap.tenCumRap === title.cinema;
      });
    }

    return list.map((item, index) => {
      item = new Date(item.ngayChieuGioChieu).toLocaleDateString();
      return (
        <MenuItem
          key={index}
          onClick={() => {
            setClick({ date: false });
            setTitle({
              ...title,
              date: item,
              session: titleArr[3],
            });
          }}
        >
          {item}
        </MenuItem>
      );
    });
  };

  const renderListSession = () => {
    let list = [];
    if (detailMovie && title.cinema !== "Rạp") {
      list = detailMovie.lichChieu.filter((item) => {
        return item.thongTinRap.tenCumRap === title.cinema;
      });
    }
    return list.map((item, index) => {
      let time = moment(item.ngayChieuGioChieu).format("HH:mm A");

      return (
        <MenuItem
          key={index}
          onClick={() => {
            setMaLichChieu(item.maLichChieu);
            setClick({ session: false });
            setTitle({ ...title, session: time });
          }}
        >
          {time}
        </MenuItem>
      );
    });
  };

  const changePage = () => {
    if (JSON.parse(localStorage.getItem("UserCustomer")) === null) {
      history.push("/login");
    } else {
      if (maLichChieu) {
        history.push(`/ticket/${maLichChieu}`);
      }
    }
  };

  return (
    <Tools>
      {/* Movie */}
      <SelectMovieContainer>
        <Select
          onClick={() => {
            setClick({
              movie: !click.movie,
              cinema: false,
              date: false,
              session: false,
            });
          }}
        >
          <TitleMovie>{title.movie}</TitleMovie>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={click.movie ? "active" : ""}>{renderListMovie()}</List>
      </SelectMovieContainer>

      {/* Cinema */}
      <SelectContainer>
        <Select
          onClick={() => {
            setClick({
              movie: false,
              cinema: !click.cinema,
              date: false,
              session: false,
            });
          }}
        >
          <Title>{title.cinema}</Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={click.cinema ? "active" : ""}>
          {title.movie !== "Phim" ? (
            renderListCinema()
          ) : (
            <MenuItem>Vui lòng chọn phim</MenuItem>
          )}
        </List>
      </SelectContainer>

      {/* Date */}
      <SelectContainer>
        <Select
          onClick={() => {
            setClick({
              movie: false,
              cinema: false,
              date: !click.date,
              session: false,
            });
          }}
        >
          <Title
            onClick={() => {
              setClick({ date: true });
            }}
          >
            {title.date}
          </Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={click.date ? "active" : ""}>
          {title.cinema !== "Rạp" ? (
            renderListDate()
          ) : (
            <MenuItem>Vui lòng chọn rạp</MenuItem>
          )}
        </List>
      </SelectContainer>

      {/* Session  */}
      <SelectContainer>
        <Select
          onClick={() => {
            setClick({
              movie: false,
              cinema: false,
              date: false,
              session: !click.session,
            });
          }}
        >
          <Title
            onClick={() => {
              setClick({ session: true });
            }}
          >
            {title.session}
          </Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={click.session ? "active" : ""}>
          {title.date !== "Ngày xem" ? (
            renderListSession()
          ) : (
            <MenuItem>Vui lòng chọn ngày xem</MenuItem>
          )}
        </List>
      </SelectContainer>
      {/* Confirm S */}
      <ConfirmContainer>
        <ButtonConfirm
          onClick={changePage}
          disabled={title.session !== "Suất chiếu" ? false : true}
        >
          MUA VÉ NGAY
        </ButtonConfirm>
      </ConfirmContainer>
    </Tools>
  );
}
