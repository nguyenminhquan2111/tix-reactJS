import React, { useState } from "react";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import styled, { keyframes } from "styled-components";
import { UserCmtDetail } from "./Comment/Comment";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 580,
    margin: "0 auto",
    marginBottom: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const YourFeeling = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.1875rem;
  padding: 0.5rem 1rem;
  .left {
    display: flex;
    input {
      border: none;
      margin-left: 0.5rem;
    }
  }
  .right {
    opacity: 0.7;
    img {
      margin-left: 0.3rem;
    }
  }
`;
const Comment = styled.div`
  border-radius: 0.1875rem;
  padding: 0.5rem 1rem;
  display: flex;
  margin: auto;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    .img__container {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
    }
    .left__detail {
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      p {
        font-size: 0.875rem;
        margin: 0;
        font-weight: 500;
      }
      span {
        font-size: 0.625rem;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    p {
      text-align: center;
      margin: 0;
      color: #91d25a;
      font-size: 1.125rem;
      font-weight: 500;
    }
    .img__container {
      img {
        max-width: 0.5rem;
        height: auto;
        vertical-align: middle;
      }
    }
  }
`;
const Middle = styled.div`
  p {
    background-color: transparent;
    padding: 1.25rem 0;
    font-size: 0.875rem;
    color: #4a4a4a !important;
    letter-spacing: -0.0125rem;
    margin: 0;
  }
`;
const Bottom = styled.div`
  border-top: 1px solid #e9e9e9;
  padding-top: 0.2rem;
  color: #737576;
  .icon {
    font-size: 1.2rem;
    transition: all 0.2s linear;
    &:hover {
      font-size: 1.3rem;
    }
  }
`;

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#949494",
    backgroundColor: "transparent",
    border: "0.0625rem solid #949494",
    padding: "0.3rem 1.5625rem",
    transition: " all 0.2s linear",
    "&:hover": {
      backgroundColor: "#fb4226",
      color: "#fff",
    },
  },
}))(Button);

export default function TabPanelDanhGia(props) {
  const { movie } = props;
  const [currentLength, setCurrentLength] = useState(1);
  const classes = useStyles();
  const renderCmtFrom = (link) => {
    if (link)
      return (
        <Avatar
          alt="Remy Sharp"
          src={link}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "1.2rem",
            height: "1.2rem",
          }}
        />
      );
  };
  const renderImgRate = (Rate) => {
    let star = 0,
      number = 0;
    star = Math.floor(Rate / 2);
    if (Rate - star * 2 > 0) number = 1;
    let arr = [];
    for (let i = 0; i < star; i++) arr.push(1);
    if (number) arr.push(2);
    return arr.map((item) => {
      if (item == 1) return <img src="/images/star1.png" alt="star1" />;
      return <img src="/images/star1.2.png" alt="star1.2" />;
    });
  };
  const changeCurrentlength = () => {
    setCurrentLength(currentLength + 1);
  };
  const renderCmt = (currentLength) => {
    return UserCmtDetail.map((item, index) => {
      if (index < currentLength * 5)
        return (
          <Card className={classes.root}>
            <Comment>
              <Top>
                <div className="left">
                  <div className="img__container">
                    <Avatar alt="Remy Sharp" src={item.Avatar} />
                    {renderCmtFrom(item.CmtFrom)}
                  </div>
                  <div className="left__detail">
                    <p>{item.Name}</p>
                    <span>{item.TimeCmt} tháng trước</span>
                  </div>
                </div>
                <div className="right">
                  <p>{item.Rate}</p>
                  <div className="img__container">
                    {renderImgRate(item.Rate)}
                  </div>
                </div>
              </Top>
              <Middle>
                <p>{item.Cmt}</p>
              </Middle>
              <Bottom>
                <ThumbUpAltOutlinedIcon className="icon" />
                <span style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>
                  0
                </span>
                <span>Thích</span>
              </Bottom>
            </Comment>
          </Card>
        );
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <YourFeeling>
          <div className="left">
            <Avatar alt="Remy Sharp" src="/images/avatar.png" />
            <input type="text" placeholder="Bạn nghĩ gì về phim này?" />
          </div>
          <div className="right">
            <img src="/images/star1.png" />
            <img src="/images/star1.png" />
            <img src="/images/star1.png" />
            <img src="/images/star1.png" />
            <img src="/images/star1.png" />
          </div>
        </YourFeeling>
      </Card>
      {renderCmt(currentLength)}
      <div style={{ margin: "0 auto ", width: "10rem", paddingTop: "1rem" }}>
        {currentLength <= 2 ? (
          <ColorButton
            style={{ margin: "0 auto" }}
            onClick={changeCurrentlength}
          >
            Xem thêm
          </ColorButton>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
