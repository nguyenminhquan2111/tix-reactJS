import React from "react";
import styled from "styled-components";
import DetailTopLeft from "./DetailTopLeft";
import DetailTopRight from "./DetailTopRight";
export default function DetailTop(props) {
  const DetailTop = styled.div`
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
  `;
  const ImgBackground = styled.img`
    filter: blur(15px);
    margin: -50% 0 -5px 0px;
    display: block;
    width: 100%;
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

  const { movie } = props;

  return (
    <div>
      <DetailTop className="position-relative">
        <ImgBackground src={movie.hinhAnh} alt />
        <Content>
          <Row className="row">
            <DetailTopLeft item={movie}></DetailTopLeft>
            <DetailTopRight item={movie}></DetailTopRight>
          </Row>
        </Content>
      </DetailTop>
    </div>
  );
}
