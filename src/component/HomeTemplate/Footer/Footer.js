import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { ListImg } from "./img/img";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const FooterContainer = styled.div`
  background: #222;
  width: 100%;
`;
const FooterStyled1 = styled.div`
  max-width: 870px;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  .title {
    font-size: 12px;
    color: #ffffff;
    font-weight: 500;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;
const FooterStyled__mobie = styled.div`
  display: none;
  .DoiTac {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 992px) {
    display: block;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 0.5rem;
  }
  @media (max-width: 768px) {
    .container__mobie {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .Tix {
        display: flex;
        a {
          padding: 0 0.5rem;
        }
      }
    }
  }
`;

const FooterStyled2 = styled.div`
  max-width: 870px;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 3rem;
  img {
    border-radius: 8px;
    height: auto;
    display: block;
    margin: 1rem 0;
  }
  .img__left {
    width: 80px;
    border-radius: 8px;
    height: auto;
    display: block;
    margin: 1rem 0;
  }
  .img__right {
    width: 130px;
  }
  span {
    display: block;
    color: white;
    line-height: 1.8;
    font-size: 12px;
    font-weight: 400;
  }
  a {
    color: #fb4226;
    text-decoration: none;
    font-size: 12px;
  }
  @media (max-width: 768px) {
    .container__2 {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;
const Left = styled.div`
  a {
    font-weight: 700;
    font-size: 0.8rem;
    display: block;
    text-decoration: none;
    color: #949494;
    line-height: 1.7rem;
    transition: all 0.2s linear;
    &:hover {
      color: #ffffff;
    }
  }
`;
const Middle = styled.div``;
const Right = styled.div`
  img {
    height: 30px;
    width: auto;
    margin: 5px;
  }
`;
const HR = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background: #4a4a4a;
  margin: 0 auto;
  max-width: 870px;
  margin-bottom: 1rem;
`;
const Item = styled.div`
  flex-grow: 0;
  max-width: 20%;
  flex-basis: 20%;
`;
function Footer() {
  const classes = useStyles();
  const renderPartner = () => {
    return ListImg.map((item, index) => {
      return (
        <Item key={index}>
          <Avatar src={item} style={{ transform: "scale(0.8)" }} />
        </Item>
      );
    });
  };
  return (
    <FooterContainer>
      <FooterStyled1 className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Left>
              <p className="title">TIX</p>
              <Grid container>
                <Grid xs={6}>
                  <a href="#">FAQ</a>
                  <a href="#">Brand Guidelines</a>
                </Grid>
                <Grid xs={6}>
                  <a href="#">Thỏa thuận sử dụng</a>
                  <a href="#">Chính sách bảo mật</a>
                </Grid>
              </Grid>
            </Left>
          </Grid>
          <Grid item xs={4}>
            <Middle>
              <p className="title">ĐỐI TÁC</p>
              <Grid container>{renderPartner()}</Grid>
            </Middle>
          </Grid>
          <Grid item xs={4}>
            <Right>
              <Grid container>
                <Grid xs={6}>
                  <p className="title">MOBIE APP</p>
                  <a href="#">
                    <img src="/images/android-logo.png" />
                  </a>
                  <a href="#">
                    <img src="/images/apple-logo.png" />
                  </a>
                </Grid>
                <Grid xs={6}>
                  <p className="title">SOCIAL</p>
                  <a href="#">
                    <img src="/images/facebook-logo.png" />
                  </a>
                  <a href="#">
                    <img src="/images/zalo-logo.png" />
                  </a>
                </Grid>
              </Grid>
            </Right>
          </Grid>
        </Grid>
      </FooterStyled1>
      <FooterStyled__mobie>
        <Grid container className="container__mobie" spacing={3}>
          <Grid item xs={4} sm={6}>
            <Left>
              <Grid container>
                <Grid xs={12} className="Tix">
                  <a href="#">Thỏa thuận sử dụng</a>
                  <a href="#">Chính sách bảo mật</a>
                </Grid>
              </Grid>
            </Left>
          </Grid>

          <Grid item xs={4}>
            <Right>
              <Grid container>
                <Grid xs={12} className="DoiTac">
                  <a href="#">
                    <img src="/images/facebook-logo.png" />
                  </a>
                  <a href="#">
                    <img src="/images/zalo-logo.png" />
                  </a>
                </Grid>
              </Grid>
            </Right>
          </Grid>
        </Grid>
      </FooterStyled__mobie>
      <HR></HR>
      <FooterStyled2>
        <Grid
          container
          spacing={0}
          className="container__2"
          style={{ justifyContent: "space-between" }}
        >
          <Grid sx={4}>
            <img src="/images/zion-logo.jpg" className="img__left" />
          </Grid>
          <Grid sx={4}>
            <span className="title">
              TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
            </span>
            <span>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </span>
            <span>
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
              <br />
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </span>
            <span>
              Số Điện Thoại (Hotline): 1900 545 436
              <br />
              Email: <a href="mailto:support@tix.vn">support@tix.vn</a>
            </span>
          </Grid>
          <Grid sx={4}>
            <img
              src="/images/d1e6bd560daa9e20131ea8a0f62e87f8.png"
              className="img__right"
            />
          </Grid>
        </Grid>
      </FooterStyled2>
    </FooterContainer>
  );
}
export default memo(Footer);
