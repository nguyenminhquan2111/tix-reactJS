import React from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { actHandleModal } from "redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    overflow: "visible !important",
    overflowY: "visible !important",
  },
}));
const StyledDialog = withStyles({
  paper: {
    overflow: "visible",
  },
})(Dialog);
const IconContainer = styled.div`
  position: absolute;
  top: -30px;
  right: -30px;
  border: 3px solid #fff;
  border-radius: 50%;
`;
const IframeContainer = styled.div`
  .iframe1 {
    display: block;
  }
  .iframe2 {
    display: none;
  }
  @media(max-width:  763px){
    .iframe1 {
      display: none;
    }
    .iframe2 {
      display: block
  }
`;
export default function ModalComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      open: state.movieReducer.isOpen,
      link: state.movieReducer.linkTrailer,
    };
  });
  const { open, link } = state;

  const handleClose = () => {
    dispatch(actHandleModal(false));
  };

  return (
    <div>
      <StyledDialog
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        {handleClose ? (
          <IconContainer>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </IconContainer>
        ) : null}
        <IframeContainer>
          <iframe
            className="iframe1"
            width={711}
            height={400}
            src={link}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <iframe
            className="iframe2"
            width={474}
            height={800 / 3}
            src={link}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </IframeContainer>
      </StyledDialog>
    </div>
  );
}
