import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Loading from "../../../Loading";
import { actFetchListMovie } from "../ListMovie/modules/actions";
import { actFetchDetailMovie } from "./modules/actions";

const Tools = styled.div`
  position: absolute;
  width: 1080px;
  background-color: white;
  // width: 60%;
  height: 80px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border-radius: 5px;
  z-index: 999;
  display: flex;
  align-items: center;
  & > div {
    cursor: pointer;
  }
  & > div > div {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // & > div > div > div {
  //   font-weight: 500;
  //   color: grey;
  // }
  & > div > div i {
    color: grey;
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

//Movie
const SelectMovieContainer = styled.div`
  flex: 3;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;
const SelectMovie = styled.div``;

//Cinema chain
// const SelectCinemaChainContainer = styled.div`
//   flex: 2;
//   border-right: solid 1px rgba(238, 238, 238, 0.88);
// `;
// const SelectCinemaChain = styled.div``;
// const ListCinemaChain = styled.div``;

//Cinema
const SelectCinemaContainer = styled.div`
  flex: 2;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;
const SelectCinema = styled.div``;
// const ListCinema = styled.div``;

//Date
const SelectDateContainer = styled.div`
  flex: 2;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;
const SelectDate = styled.div``;
// const ListDate = styled.div``;

//Session
const SelectSessionContainer = styled.div`
  flex: 2;
  border-right: solid 1px rgba(238, 238, 238, 0.88);
  position: relative;
`;
const SelectSession = styled.div``;
// const ListSession = styled.div``;

//Confirm
const ConfirmContainer = styled.div`
  flex: 2;
`;
const ButtonConfirm = styled.div`
  padding: 0.5rem;
`;

const MenuItem = styled.li`
  padding: 0.2rem 1rem;
  white-space: nowrap;
`;
const TitleMovie = styled.li`
  max-width: 12rem;
  font-weight: 500;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.li`
  max-width: 8rem;
  font-weight: 500;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      isLoading: state.detailMovieReducer.loading,
      data: state.detailMovieReducer.data,
      listMovie: state.listMovieReducer.data,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListMovie());
    renderListMovie();
  }, []);

  useEffect(() => {
    dispatch(actFetchDetailMovie(movieId));
  }, [movieId]);

  const { listMovie, data, isLoading } = state;

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
    if (isLoading) {
      return (
        <MenuItem>
          <Loading />
        </MenuItem>
      );
    }
    if (data && data.lichChieu.length === 0) {
      return <MenuItem>Chưa có thông tin</MenuItem>;
    }
    if (data && data.lichChieu) {
      console.log(data);
      list = data.lichChieu.map((item) => {
        return item.thongTinRap.tenCumRap;
      });
    }

    list = new Set(list);
    list = [...list];

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
    if (data && cinema !== "Rạp") {
      list = data.lichChieu.filter((item) => {
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
    if (data && cinema !== "Rạp") {
      list = data.lichChieu.filter((item) => {
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
        <SelectMovie
          onClick={() => {
            setMovieClick(!movieClick);
            setCinemaClick(false);
            setDateClick(false);
            setSessionClick(false);
          }}
        >
          <TitleMovie>{movie}</TitleMovie>
          <i class="fas fa-angle-down"></i>
        </SelectMovie>
        <List className={movieClick ? "active" : ""}>{renderListMovie()}</List>
      </SelectMovieContainer>

      {/* Cinema */}
      <SelectCinemaContainer>
        <SelectCinema
          onClick={() => {
            setCinemaClick(!cinemaClick);
            setMovieClick(false);
            setDateClick(false);
            setSessionClick(false);
          }}
        >
          <Title>{cinema}</Title>
          <i class="fas fa-angle-down"></i>
        </SelectCinema>
        <List className={cinemaClick ? "active" : ""}>
          {movie !== "Phim" ? (
            renderListCinema()
          ) : (
            <MenuItem>Vui lòng chọn phim</MenuItem>
          )}
        </List>
      </SelectCinemaContainer>

      {/* Date */}
      <SelectDateContainer>
        <SelectDate
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
          <i class="fas fa-angle-down"></i>
        </SelectDate>
        <List className={dateClick ? "active" : ""}>
          {cinema !== "Rạp" ? (
            renderListDate()
          ) : (
            <MenuItem>Vui lòng chọn rạp</MenuItem>
          )}
        </List>
      </SelectDateContainer>

      {/* Session  */}
      <SelectSessionContainer>
        <SelectSession
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
          <i class="fas fa-angle-down"></i>
        </SelectSession>
        <List className={sessionClick ? "active" : ""}>
          {date !== "Ngày xem" ? (
            renderListSession()
          ) : (
            <MenuItem>Vui lòng chọn ngày xem</MenuItem>
          )}
        </List>
      </SelectSessionContainer>
      {/* Confirm S */}
      <ConfirmContainer>
        <ButtonConfirm>Confirm</ButtonConfirm>
      </ConfirmContainer>
    </Tools>
  );
}
