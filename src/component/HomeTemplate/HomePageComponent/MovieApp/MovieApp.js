import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 600px;
  max-width: 100%;
  margin: 0 auto;
  background-image: url("/images/bg-app.jpg");
  background-size: contain;
  display: flex;
  justify-content: space-around;
`;
const Info = styled.div`
  text-align: center;
  margin: auto;
  h1,
  h2,
  p {
    color: #fff;
  }
  h1 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 3rem;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  p {
    margin-top: 1rem;
    font-weight: 500;
    span {
      cursor: pointer;
      line-height: 1rem;
      text-decoration-line: underline;
    }
  }
`;

export default function MovieApp() {
  return (
    <Wrapper>
      <Info>
        <h1>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
        <h2>
          Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi
          quà hấp dẫn
        </h2>
        <Button variant="contained" color="secondary">
          App miễn phí - Tải về ngay
        </Button>
        <p>
          TIX có 2 phiên bản <span>iOS</span> và <span>Android</span>
        </p>
      </Info>
    </Wrapper>
  );
}
