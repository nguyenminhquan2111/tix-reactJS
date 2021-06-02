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
export default function ModalComponent(props) {
  const { trailerFlim } = props;
  console.log(trailerFlim);
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      open: state.movieReducer.isOpen,
    };
  });
  const { open } = state;
  console.log(open);

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
        <iframe
          width={948}
          height={1600 / 3}
          src={trailerFlim}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </StyledDialog>
    </div>
  );
}
