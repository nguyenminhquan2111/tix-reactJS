import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { actHandleModal } from "redux/actions/movieActions";
import { useDispatch } from "react-redux";

export default function DetailTopLeft(props) {
  const Col_3 = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
    background: url(${(props) => props.img});
    border-radius: 5px;
    margin: 0;
    padding: 0;
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
  const { item } = props;
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(actHandleModal(true));
  };
  return (
    <Col_3 img={item.hinhAnh}>
      <div className="img-caption d-block">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          style={{
            width: "5rem",
            height: "5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            border: "none",
          }}
        >
          <i id="myBtn1" className="fa fa-play" />
        </Button>
      </div>
    </Col_3>
  );
}
