/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Loading from "../../../../Loading";
import _ from "lodash";
import { actGetDetailMovie, actGetListMovie } from "redux/actions/movieActions";

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

export default function BookingTools() {
  const [movieClick, setMovieClick] = useState(false);
  const [movie, setMovie] = useState("Phim");
  const [movieId, setMovieId] = useState("");

  const [cinemaClick, setCinemaClick] = useState(false);
  const [cinema, setCinema] = useState("Rạp");

  const [dateClick, setDateClick] = useState(false);
  const [date, setDate] = useState("Ngày xem");

  const [sessionClick, setSessionClick] = useState(false);
  const [session, setSession] = useState("Suất chiếu");

  const state = useSelector((state) => {
    return {
      detailMovie: state.movieReducer.detailMovie,
      listMovie: state.movieReducer.listMovie,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetListMovie());
  }, []);

  useEffect(() => {
    dispatch(actGetDetailMovie(movieId));
  }, [movieId]);

  const { listMovie, detailMovie } = state;

  const renderListMovie = () => {
    return (
      listMovie &&
      listMovie.map((item, index) => {
        return (
          <MenuItem
            key={index}
            onClick={() => {
              setMovie(item.tenPhim);
              setMovieId(item.maPhim);
              setMovieClick(false);
              setCinema("Rạp");
              setDate("Ngày xem");
              setSession("Suất chiếu");
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
    if (!detailMovie) {
      return (
        <MenuItem>
          <Loading />
        </MenuItem>
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
            setCinemaClick(false);
            setCinema(item);
            setDate("Ngày xem");
            setSession("Suất chiếu");
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
    if (detailMovie && cinema !== "Rạp") {
      list = detailMovie.lichChieu.filter((item) => {
        return item.thongTinRap.tenCumRap === cinema;
      });
    }

    return list.map((item, index) => {
      item = new Date(item.ngayChieuGioChieu).toLocaleDateString();
      return (
        <MenuItem
          key={index}
          onClick={() => {
            setDateClick(false);
            setDate(item);
            setSession("Suất chiếu");
          }}
        >
          {item}
        </MenuItem>
      );
    });
  };

  const renderListSession = () => {
    let list = [];
    if (detailMovie && cinema !== "Rạp") {
      list = detailMovie.lichChieu.filter((item) => {
        return item.thongTinRap.tenCumRap === cinema;
      });
    }
    return list.map((item, index) => {
      item = new Date(item.ngayChieuGioChieu).toLocaleTimeString();
      return (
        <MenuItem
          key={index}
          onClick={() => {
            setSessionClick(false);
            setSession(item);
          }}
        >
          {item}
        </MenuItem>
      );
    });
  };

  return (
    <Tools>
      {/* Movie */}
      <SelectMovieContainer>
        <Select
          onClick={() => {
            setMovieClick(!movieClick);
            setCinemaClick(false);
            setDateClick(false);
            setSessionClick(false);
          }}
        >
          <TitleMovie>{movie}</TitleMovie>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={movieClick ? "active" : ""}>{renderListMovie()}</List>
      </SelectMovieContainer>

      {/* Cinema */}
      <SelectContainer>
        <Select
          onClick={() => {
            setCinemaClick(!cinemaClick);
            setMovieClick(false);
            setDateClick(false);
            setSessionClick(false);
          }}
        >
          <Title>{cinema}</Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={cinemaClick ? "active" : ""}>
          {movie !== "Phim" ? (
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
            setCinemaClick(false);
            setMovieClick(false);
            setDateClick(!dateClick);
            setSessionClick(false);
          }}
        >
          <Title
            onClick={() => {
              setDateClick(true);
            }}
          >
            {date}
          </Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={dateClick ? "active" : ""}>
          {cinema !== "Rạp" ? (
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
            setCinemaClick(false);
            setMovieClick(false);
            setDateClick(false);
            setSessionClick(!sessionClick);
          }}
        >
          <Title
            onClick={() => {
              setSessionClick(true);
            }}
          >
            {session}
          </Title>
          <i className="fas fa-angle-down"></i>
        </Select>
        <List className={sessionClick ? "active" : ""}>
          {date !== "Ngày xem" ? (
            renderListSession()
          ) : (
            <MenuItem>Vui lòng chọn ngày xem</MenuItem>
          )}
        </List>
      </SelectContainer>
      {/* Confirm S */}
      <ConfirmContainer>
        <ButtonConfirm disabled={session !== "Suất chiếu" ? false : true}>
          MUA VÉ NGAY
        </ButtonConfirm>
      </ConfirmContainer>
    </Tools>
  );
}
