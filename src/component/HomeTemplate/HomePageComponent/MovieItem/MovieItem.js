import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  transition: all 0.2s;
  ${Item}:hover & {
    transform: translateY(-2%);
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
`;

const Title = styled.h3`
  color: #050938;
  font-weight: 600;
  text-transform: capitalize;
  display: -webkit-box;
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
  ${Item}:hover & {
    display: none;
  }
`;
const ComingSoonTime = styled(Time)`
  ${Item}:hover & {
    display: block;
  }
`;
export default function MovieItem(props) {
  const { movie, status } = props;

  return (
    <Item>
      <ItemMedia>
        <Image src={movie.hinhAnh} alt={movie.tenPhim}></Image>
        <ImageShadow src={movie.hinhAnh} alt={movie.tenPhim}></ImageShadow>
      </ItemMedia>

      {status === "nowShowing" ? (
        <>
          <Title>{movie.tenPhim}</Title>
          <Time>{movie.danhGia}</Time>
          <Button variant="contained" color="secondary" className="buyButton">
            <Link to={`/detal/${movie.maPhim}`} style={{ color: "#fff" }}>
              MUA VÉ
            </Link>
          </Button>
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
