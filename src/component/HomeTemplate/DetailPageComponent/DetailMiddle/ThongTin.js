import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const News = styled.div`
  margin-top: 2rem;

  .news__title {
    font-size: 0.8rem;
    font-weight: bold;
  }
  .news__container {
    margin-bottom: 0.9375rem;
    width: calc(100% / 3);
    overflow: hidden;
    padding-right: 2rem;
    .newsImg {
      img {
        height: 8.0625rem !important;
        object-fit: cover;
        border-radius: 0.25rem;
        vertical-align: middle;
        cursor: pointer;
        opacity: 1;
        transition: all 0.5s linear;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .titleMore {
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      line-height: 1.625rem;
      margin-bottom: 0.5rem;
      height: 3.125rem;

      overflow: hidden;
      text-overflow: ellipsis;

      transition: all 0.2s linear;
      margin-top: 1rem;
      &:hover {
        color: #fb4226;
      }
    }
    .interactive {
      display: flex;
      .item {
        cursor: pointer;
        span {
          padding: 0 1rem;
        }
      }
    }
  }
`;

const ThongTin = styled.div`
  .left {
    .left1 {
      p {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    .left2 {
      p {
        font-size: 0.8rem;
      }
    }
  }
  .right {
    padding-left: 2.5rem;
    p {
      font-weight: bold;
      font-size: 0.8rem;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;
export default function TabPanelThongTin(props) {
  const { movie } = props;
  const [like, setLike] = useState(0);
  const [cmt, setCmt] = useState(0);

  const handleLike = () => {
    setLike(like + 1);
  };
  const handleCmt = () => {
    setCmt(cmt + 1);
  };
  return (
    <ThongTin>
      <Grid container spacing={0}>
        <Grid container item xs={12} sm={6} className="left">
          <Grid container spacing={2}>
            <Grid item xs={4} className="left1">
              <p>Ngày công chiếu</p>
              <p>Đạo diễn</p>
              <p>Diễn viên</p>
              <p>Thể Loại</p>
              <p>Định Dạng</p>
              <p>Quốc gia SX</p>
            </Grid>
            <Grid item xs={8} className="left2">
              <p>{new Date(movie.ngayKhoiChieu).toLocaleDateString()}</p>
              <p>Kim Joo-Hwan</p>
              <p>Choi Woo Sik, Ahn Sung Ki</p>
              <p>Hành Động, Horor</p>
              <p>2D/Digital</p>
              <p>Việt Nam</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className="right">
          <p>Nội dung</p>
          <span>{movie.moTa}</span>
        </Grid>
      </Grid>
      <News>
        <p className="news__title">Tin liên quan</p>
        <div className="news__container">
          <div className="newsImg">
            <img
              src="/images/review-sac-dep-doi-tra-huong-giang-ke-chuyen-doi-minh-qua-phim-anh-15817958493092.jpg"
              alt
            />
          </div>
          <div className="titleMore">
            <p>
              [Review] Sắc Đẹp Dối Trá - Hương Giang kể chuyện đời mình qua phim
              ảnh
            </p>
          </div>
          <div className="interactive">
            <div className="item" onClick={handleLike}>
              <ThumbUpAltIcon />
              <span>{like}</span>
            </div>
            <div className="item" onClick={handleCmt}>
              <ChatBubbleIcon />
              <span>{cmt}</span>
            </div>
          </div>
        </div>
      </News>
    </ThongTin>
  );
}
