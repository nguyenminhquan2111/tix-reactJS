import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import { fetchLoginForm } from "redux/actions/userActions";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FormContainer = styled.div`
  background-image: url(/images/form.jpg);
  background-size: contain;
  background-position: center;
  width: 100vw;
  height: 50rem;
`;
const TabsContainer = styled.div`
  margin-top: 2rem;
  max-width: 525px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: rgba(40, 57, 101, 0.9);
  padding: 50px 70px 50px 70px;
  border-radius: 5px;
  box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);

  .MuiAppBar-colorPrimary {
    background-color: transparent;
  }
  .title {
    color: #fff;
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.7;
  }
  input {
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    margin: 0.5rem 0;
  }
  .buttonForm {
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background-color: #3f51b5;
    width: 100%;
    margin: 0.5rem 0;
  }
  .checkBoxContainer {
    display: flex;
    align-items: center;
    transform: translateX(-11px);
    .checkBoxContent {
      color: #fff;
    }
  }
`;
export default function Form(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);

  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState({ taiKhoan: "", matKhau: "" });
  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (state.taiKhoan === "" && state.matKhau === "") {
      Swal.fire("Bạn phải nhập tài khoản và mật khẩu", "", "error");
      return;
    }
    if (state.taiKhoan === "") {
      Swal.fire("Bạn phải nhập tài khoản ", "", "error");
      return;
    }
    if (state.matKhau === "") {
      Swal.fire("Bạn phải nhập mật khẩu", "", "error");
      return;
    }
    dispatch(fetchLoginForm(state, props.history));
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };

  return (
    <FormContainer>
      <TabsContainer>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="simple tabs example"
          >
            <Tab label="SIGN IN" {...a11yProps(0)} />
            <Tab label="SIGN UP" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <form>
            <p className="title">USERNAME</p>
            <input name="taiKhoan" onChange={handleOnChange} />
            <p className="title">PASSWORD</p>
            <input name="matKhau" onChange={handleOnChange} />
            <div className="checkBoxContainer">
              <Checkbox
                checked={checked}
                onChange={handleChangeChecked}
                color="primary"
                inputProps={{ "aria-label": "secondary  checkbox" }}
              />
              <span className="checkBoxContent">Keep me Signed in</span>
            </div>

            <Button
              onClick={handleLogin}
              variant="contained"
              className="buttonForm"
            >
              Submit
            </Button>
            <Link to={"/"}>
              <Button variant="contained" className="buttonForm">
                Back To Home
              </Button>
            </Link>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </TabsContainer>
    </FormContainer>
  );
}
