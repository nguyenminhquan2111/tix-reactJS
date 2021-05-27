import React, { useState } from "react";
import styled from "styled-components";
import CircleProgressBar from "./CircleProgressBar/CircleProgressBar";
export default function DetailTopRight(props) {
  const Col_9 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .left {
      width: 32rem;
      color: #e9e9e9;
      font-weight: 1rem;
      //padding-right: 21rem;
      padding-left: 1rem;
      .pEl-2 {
        span {
          font-size: 1rem;
          display: inline-block;
          background-color: #fb4226 !important;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translate(6.25rem, 0.625rem);
      .circular {
        height: 6.25rem;
        width: 6.25rem;
        transform: scale(1.3);
        // background: red;
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
        margin-top: 0;
        margin-bottom: 5px;
        img {
          max-width: 2rem;
          height: auto;
          vertical-align: middle;
          margin: 0 0.1rem;
        }
      }
      .detail {
        margin-top: 5px;
        color: #e9e9e9;
        font-size: 0.9rem;
      }
    }
  `;
  const { item } = props;
  const renderImg = () => {
    let star = 0,
      number = 0;
    star = Math.floor(item.danhGia / 2);
    if (item.danhGia - star * 2 > 0) number = 1;
    let arr = [];
    for (let i = 0; i < star; i++) arr.push(1);
    if (number) arr.push(2);
    return arr.map((item) => {
      if (item == 1) return <img src="/images/star1.png" alt="star1" />;
      return <img src="/images/star1.2.png" alt="star1.2" />;
    });
  };
  return (
    <div>
      <Col_9 className="col-9 m-0 p-0">
        <div className="left">
          <p className="pEl-1">
            {new Date(item.ngayKhoiChieu).toLocaleDateString()}
          </p>
          <p className="pEl-2">
            <span>C16</span>
            {item.tenPhim}
          </p>
          <p className="pEl-3">
            {item.lichChieu[0]?.thoiLuong} phút - 0 IMDb - 2D/Digital
          </p>
        </div>
        <div className="right">
          {/* <div className="circular">
          <div className="inner" />
          <div className="numb display-4">7.3</div>
        </div> */}
          <CircleProgressBar
            trailStrokeColor="gray"
            strokeColor="#7ed321"
            percentage={item.danhGia * 10}
          />
          <div className="img-container">{renderImg()}</div>
          <p className="detail">271 người đánh giá</p>
        </div>
      </Col_9>
    </div>
  );
}
