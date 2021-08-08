import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
    fontSize: "1rem",
    width: "150px",
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
  button: {},
  buttonLogout: {
    background: "#212121",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fb4226",
    },
  },
  buttonGroup: {
    margin: "0.5rem 0",
  },
}));

const Appbar = (props) => {
  console.log(props);
  const { history } = props;
  const theme = useTheme();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isMobie = useMediaQuery(theme.breakpoints.down("xs"));
  console.log(isMobie);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const handleLogout = (pageURL) => {
    localStorage.removeItem("UserAdmin");
    history.replace("/");
  };
  const menuItem = [
    {
      title: "Dashboard User",
      pageURL: "/admin/dashboard-user",
    },
    {
      title: "Dashboard Movie",
      pageURL: "/admin/dashboard-movie",
    },
    {
      title: "Dashboard TheaterManager",
      pageURL: "/admin/dashboard-theater-manager",
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <EmojiPeopleIcon />
            Hi, admin {userAdmin.hoTen}
          </Typography>

          {isMobie ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                {menuItem.map((menuItem) => {
                  const { title, pageURL } = menuItem;
                  return (
                    <MenuItem
                      onClick={() => {
                        handleMenuClick(pageURL);
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
                <MenuItem
                  onClick={() => {
                    handleLogout("/");
                  }}
                >
                  Đăng Xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                className={classes.buttonGroup}
              >
                {menuItem.map((menuItem) => {
                  const { title, pageURL } = menuItem;
                  return (
                    <Button
                      textSizeSmall
                      className={classes.button}
                      variant="contained"
                      onClick={() => {
                        handleButtonClick(pageURL);
                      }}
                    >
                      {title}
                    </Button>
                  );
                })}
                <Button
                  className={classes.buttonLogout}
                  variant="contained"
                  onClick={() => {
                    handleLogout("/");
                  }}
                >
                  Đăng Xuất
                </Button>
              </ButtonGroup>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withRouter(Appbar);
