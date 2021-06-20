import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    background: "#212121",
    marginTop: "100px",
    color: "#fafafa",
    hover: {
      "&:hover": {
        backgroundColor: "rgb(7, 177, 77, 0.42)",
      },
    },
  },
  container: {
    width: "260px",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: "auto",
    border: "none",
    bottom: 0,
    zIndex: 1,
    border: 0,
    borderRadius: 3,
    boxShadow:
      "0 10px 30px -12px rgb(0 0 0 / 42%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
    color: "white",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: "0 auto",
    textDecoration: "none",
    width: "10rem",
    height: "10rem",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "8rem",
  },
  leftUp1: {
    marginLeft: "-9px",
    marginBottom: "30px",
    marginTop: "10px",
    textDecoration: "none",
  },
  menu: {
    zIndex: 4,
    textAlign: "center",
  },

  buttonMenu: {
    color: "#fff",
  },
}));
function Navbar() {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  const classes = useStyles();
  let history = useHistory();
  let changePageHome = () => {
    setTimeout(() => {
      history.replace("/");
      localStorage.removeItem("UserAdmin");
    }, 1000);
  };
  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Avatar className={classes.avatar} alt="Remy Sharp">
          <PersonIcon className={classes.icon} />
        </Avatar>

        <span className={classes.span}></span>
        <p>Hi, admin {userAdmin.hoTen}</p>
        <hr />
        <div className={classes.leftUp1}>
          <NavLink
            activeClassName="active"
            style={{ textDecoration: "none" }}
            to="/admin/dashboard-user"
            exact
          >
            <Button fullWidth> DashBoard User</Button>
          </NavLink>
        </div>

        <div className={classes.leftUp2}>
          <NavLink
            activeClassName="active"
            style={{ textDecoration: "none" }}
            to="/admin/dashboard-movie"
            exact
          >
            <Button fullWidth> DashBoard Movie</Button>
          </NavLink>
        </div>
        <hr />

        <Button
          className={classes.button}
          onClick={changePageHome}
          color="primary"
          variant="contained"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
export default Navbar;
