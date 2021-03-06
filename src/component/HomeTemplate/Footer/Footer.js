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
                <Grid item xs={6}>
                  <a href="https://www.cgv.vn/">FAQ</a>
                  <a href="https://www.cgv.vn/">Brand Guidelines</a>
                </Grid>
                <Grid item xs={6}>
                  <a href="https://www.cgv.vn/">Th???a thu???n s??? d???ng</a>
                  <a href="https://www.cgv.vn/">Ch??nh s??ch b???o m???t</a>
                </Grid>
              </Grid>
            </Left>
          </Grid>
          <Grid item xs={4}>
            <Middle>
              <p className="title">?????I T??C</p>
              <Grid container>{renderPartner()}</Grid>
            </Middle>
          </Grid>
          <Grid item xs={4}>
            <Right>
              <Grid container>
                <Grid item xs={6}>
                  <p className="title">MOBIE APP</p>
                  <a href="#">
                    <img src="/images/android-logo.png" />
                  </a>
                  <a href="#">
                    <img src="/images/apple-logo.png" />
                  </a>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={12} className="Tix">
                  <a href="#">Th???a thu???n s??? d???ng</a>
                  <a href="#">Ch??nh s??ch b???o m???t</a>
                </Grid>
              </Grid>
            </Left>
          </Grid>

          <Grid item xs={4}>
            <Right>
              <Grid container>
                <Grid item xs={12} className="DoiTac">
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
          <Grid item xs={4}>
            <img src="/images/zion-logo.jpg" className="img__left" alt="" />
          </Grid>
          <Grid item xs={4}>
            <span className="title">
              TIX ??? S???N PH???M C???A C??NG TY C??? PH???N ZION
            </span>
            <span>
              ?????a ch???: Z06 ???????ng s??? 13, Ph?????ng T??n Thu???n ????ng, Qu???n 7, Tp. H???
              Ch?? Minh, Vi???t Nam.
            </span>
            <span>
              Gi???y ch???ng nh???n ????ng k?? kinh doanh s???: 0101659783,
              <br />
              ????ng k?? thay ?????i l???n th??? 30, ng??y 22 th??ng 01 n??m 2020 do S??? k???
              ho???ch v?? ?????u t?? Th??nh ph??? H??? Ch?? Minh c???p.
            </span>
            <span>
              S??? ??i???n Tho???i (Hotline): 1900 545 436
              <br />
              Email: <a href="mailto:support@tix.vn">support@tix.vn</a>
            </span>
          </Grid>
          <Grid item xs={4}>
            <img
              src="/images/d1e6bd560daa9e20131ea8a0f62e87f8.png"
              className="img__right"
              alt=""
            />
          </Grid>
        </Grid>
      </FooterStyled2>
    </FooterContainer>
  );
}
export default memo(Footer);
