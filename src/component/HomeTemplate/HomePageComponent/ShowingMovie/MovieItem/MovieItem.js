import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { actHandleModal } from "redux/actions/movieActions";
import { useDispatch } from "react-redux";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { withStyles } from "@material-ui/core/styles";

const Item = styled.div`
  margin: 0.2rem 1rem;
  overflow: hidden;
  padding-top: 5px;
  cursor: pointer;
  min-height: 24rem;
  .buyButton {
    width: 100%;
    display: none;
  }
  &:hover {
    .buyButton {
      display: block;
    }
  }
`;

const ItemMedia = styled.div`
  position: relative;
  opacity: 1;
  ${Item}:hover & {
    border-radius: 20px;
    opacity: 0.7;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 270px;
  border-radius: 0;
  object-fit: cover;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  transition: all 0.2s;
  ${Item}:hover & {
    transform: translateY(-2%);
  }
  @media (min-width: 768px) {
    border-radius: 20px;
  }
`;

const ImageShadow = styled.img`
  position: absolute;
  top: 15px;
  left: 0;
  filter: blur(24px);
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transform: scale(0.85);
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const Title = styled.h3`
  color: #050938;
  font-weight: 600;
  text-transform: capitalize;
  display: none;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1;
  height: 2.5rem;
  font-size: 1.2rem;
  margin-bottom: 0;
  ${Item}:hover & {
    display: none;
  }
  @media (min-width: 768px) {
    display: -webkit-box;
  }
`;
const ComingSoonTitle = styled(Title)`
  ${Item}:hover & {
    display: block;
  }
`;
const Time = styled.p`
  text-transform: capitalize;
  color: #4a4a4a;
  font-size: 13px;
  display: none;
  ${Item}:hover & {
    display: none;
  }
  @media (min-width: 768px) {
    display: block;
  }
`;
const ComingSoonTime = styled(Time)`
  ${Item}:hover & {
    display: block;
  }
`;
const IconPlayVideo = styled.i`
  display: none;
  color: #fff;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  border: 2px solid #ff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background: rgba(197, 197, 197, 0.3);
`;

const IconPlayContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s linear;
  ${Item}:hover & {
    opacity: 1;
  }
`;
const StyledButton = withStyles({
  contained: {
    backgroundColor: "#fa5238",
    color: "#fff",
  },
})(Button);
export default function MovieItem(props) {
  const { movie, status } = props;
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(actHandleModal(true, movie.trailer));
  };
  return (
    <Item>
      <ItemMedia style={{ position: "relative" }}>
        <Image src={movie.hinhAnh} alt={movie.tenPhim}></Image>
        <ImageShadow src={movie.hinhAnh} alt={movie.tenPhim}></ImageShadow>
        <IconPlayContainer onClick={handleClickOpen}>
          <PlayCircleOutlineIcon
            style={{ transform: "scale(2)", color: "#fff" }}
          />
        </IconPlayContainer>
      </ItemMedia>

      {status === "nowShowing" ? (
        <>
          <Title>{movie.tenPhim}</Title>
          <Time>{movie.danhGia}</Time>

          <Link to={`/detail/${movie.maPhim}`} style={{ color: "#fff" }}>
            <StyledButton variant="contained" className="buyButton">
              MUA VÉ
            </StyledButton>
          </Link>
        </>
      ) : (
        <>
          <ComingSoonTitle>{movie.tenPhim}</ComingSoonTitle>
          <ComingSoonTime>{movie.danhGia}</ComingSoonTime>
        </>
      )}
    </Item>
  );
}
