import React, { memo, useState } from "react";
import styled from "styled-components";
import DetailTopLeft from "./DetailTopLeft";
import DetailTopRight from "./DetailTopRight";

import ModalComponent from "./../../Modal/Modal";

const DetailTop_Desktop = styled.div`
   {
    box-sizing: border-box;
    overflow: hidden;
    margin-top: 4rem;
    z-index: 1;
    max-height: 30rem;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(to top, rgb(10, 32, 41), transparent 100%);
    }
  }
  @media (max-width: 736px) {
    display: none;
  }
`;
const DetailTop__mobie = styled.div`
  overflow: hidden;
  display: none;

  @media (max-width: 736px) {
    display: block;
  }
`;
const ImgBackground = styled.img`
  filter: blur(15px);
  margin: -50% 0 -5px 0px;
  display: block;
  width: 100%;
`;
const ImgBackgroundMobie = styled.img`
  margin: -50% 0 -5px 0px;
  display: block;
  width: 100%;
`;
const Container__ImgBackGroundMobie = styled.div.attrs((props) => ({
  Height: props.height,
}))`
  dislay: none !important;
  overflow: hidden;
  margin-top: 4rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: ${(props) => props.Height};

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to top, rgb(10, 32, 41), transparent 100%);
  }
`;
const Content__mobie = styled.div`
  background: #0a2029;
  padding-bottom: 2rem;
  padding-left: 1.5rem;
  padding-top: 1rem;
  transform: scale(1.01);
  position: relative;
  z-index: 2;
  span {
    font-size: 14px;
    color: #949494;
  }
  h1 {
    font-size: 20px;
    color: #ffffff;
  }
  p {
    font-size: 14px;
    color: #949494;
  }
  @media (max-width: 736px) {
    padding-bottom: 1rem;
  }
`;
const Content = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  display: block;
  max-width: 870px;
  height: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -50%);
  margin: auto;
`;
const Row = styled.div`
  height: 100%;
`;
const ImgCaptionMovie = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  left: 0;
  z-index: 1;
  img {
    display: block;
    color: #ffffff;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

function DetailTop(props) {
  const Iframe = styled.iframe.attrs((props) => ({
    Open: props.isOpen,
  }))`
    display: ${(props) => props.Open};
  `;
  const { movie } = props;
  const [open, setOpen] = useState("none");
  console.log({ open });
  const handleClickOpen = () => {
    setOpen("block");
  };
  return (
    <div>
      <DetailTop_Desktop className="position-relative">
        <ImgBackground src={movie.hinhAnh} alt="desktop" />
        <Content>
          <Row className="row">
            <DetailTopLeft item={movie}></DetailTopLeft>
            <DetailTopRight item={movie}></DetailTopRight>
          </Row>
        </Content>
      </DetailTop_Desktop>
      <DetailTop__mobie>
        <Container__ImgBackGroundMobie height={open === "none" ? "20rem" : "0"}>
          <ImgBackgroundMobie src={movie.hinhAnh} alt="mobie" />
          <ImgCaptionMovie>
            <img
              src="/images/play-video.png"
              alt="img-caption"
              onClick={handleClickOpen}
            />
          </ImgCaptionMovie>
        </Container__ImgBackGroundMobie>
        <Iframe
          isOpen={open}
          width="100%"
          height={300}
          src={movie.trailer}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Content__mobie>
          <p>{new Date(movie.ngayKhoiChieu).toLocaleDateString()}</p>
          <h1>{movie.tenPhim}</h1>
          <p>91 phút - 0 IMDb - 2D/Digital</p>
        </Content__mobie>
      </DetailTop__mobie>
      <ModalComponent />
    </div>
  );
}

export default memo(DetailTop);
