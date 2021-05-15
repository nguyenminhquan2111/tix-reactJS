import React from "react";
import styled from "styled-components";

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

    .col-9 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .left {
        color: #e9e9e;
        font-weight: 1rem;
        padding-left: 1rem;
        .pEl-2 {
          span {
            font-size: 1rem;
            display: inline-block;
            background-color: #4a4a4a;
            padding: 0 6px;
            border-radius: 5px;
            margin-right: 5px;
          }
          font-size: 1.5rem;
          margin: 0;
        }
      }
      .right {
        text-align: center;
        width: 25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translate(6.25rem, 0.625rem);
        .circular {
          height: 6.25rem;
          width: 6.25rem;
          transform: scale(1.3);
          position: relative;
          .inner {
            z-index: 3;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 87px;
            width: 87px;
            border-radius: 100%;

            background-color: rgba(0, 0, 0, 0.4);
          }
          .circle {
            .bar {
              position: absolute;
              height: 100%;
              width: 100%;
              border-radius: 100%;

              clip: rect(0px, 6.25rem, 6.25rem, 50px);
            }
            .circle__left {
              padding: 0;
              .progress {
                z-index: 1;
                position: absolute;
                height: 100%;
                width: 100%;
                border-radius: 100%;
                clip: rect(0px, 50px, 6.25 rem, 0px);
                transform: rotate(180deg);
                border: 7px solid #737576;

                background: transparent;
              }
            }
            .circle__right {
              transform: rotate(180deg);
              .progress {
                z-index: 2;

                position: absolute;
                height: 100%;
                width: 100%;
                border-radius: 100%;
                clip: rect(0px, 3.125 rem, 6.25 rem, 0px);
                transform: rotate(82.8deg);
                border: 7px solid #737576;
                background: transparent;
              }
            }
            .circle__overlay {
              transform: rotate(180deg);
              .progress {
                z-index: 1;
                position: absolute;
                height: 100%;
                width: 100%;
                border-radius: 100%;
                clip: rect(0px, 50/16rem, 6.25rem, 0px);
                transform: rotate(262.8deg);
                border: 7px solid #3a3a3a;
                background: transparent;
              }
            }
          }
          .numb {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 4;
            font-size: 2rem;
            font-weight: 1rem;
            color: #fff;
          }
        }
        .img-container {
          position: relative;
          display: flex;
          margin-top: 1.8rem;
          margin-bottom: 5/16rem;
          img {
            max-width: 2rem;
            height: auto;
            vertical-align: middle;
          }
        }
        .detail {
          color: #e9e9e9;
          font-size: 0.9rem;
        }
      }
    }
  `;
  const Col_3 = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
    background: url(${(props) => props.img});
    border-radius: 5px;
    // padding-left: 15px;
    position: relative;
    background-repeat: round;
    &:hover {
      .img-caption {
        i {
          display: block;
        }
      }
    }
    .img-caption {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0;
      left: 0;
      z-index: 1;
      i {
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
      }
    }
  `;
  const { movie } = props;

  return (
    <div>
      <DetailTop className="position-relative">
        <ImgBackground src={movie.hinhAnh} alt />
        <Content>
          <Row className="row">
            <Col_3 className=" m-0 p-0" img={movie.hinhAnh}>
              <div className="img-caption d-block">
                <i id="myBtn1" className="fa fa-play" />
              </div>
            </Col_3>
            <div className="col-9 m-0 p-0">
              <div className="left">
                <p className="pEl-1">14.02.2020</p>
                <p className="pEl-2">
                  <span>C16</span>
                  {movie.tenPhim}
                </p>
                <p className="pEl-3">91 phút - 0 IMDb - 2D/Digital</p>
              </div>
              <div className="right">
                <div className="circular">
                  <div className="inner" />
                  <div className="numb display-4">7.3</div>
                  <div className="circle">
                    <div className="bar circle__left">
                      <div className="progress" />
                    </div>
                    <div className="bar circle__right">
                      <div className="progress" />
                    </div>
                    <div className="bar circle__overlay">
                      <div className="progress" />
                    </div>
                  </div>
                </div>
                <div className="img-container">
                  <img src="./img/star1.png" alt />
                  <img src="./img/star1.png" alt />
                  <img src="./img/star1.png" alt />
                  <img src="./img/star1.2.png" alt />
                </div>
                <p className="detail">271 người đánh giá</p>
              </div>
            </div>
          </Row>
        </Content>
      </DetailTop>
    </div>
  );
}
