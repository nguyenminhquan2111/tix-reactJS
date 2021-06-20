import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
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
  max-width: 100%;
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
const StyledTabs = withStyles({
  flexContainer: {
    justifyContent: "space-around",
  },
})(Tabs);
export default function Form(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FormContainer>
      <TabsContainer>
        <AppBar position="static">
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="simple tabs example"
          >
            <Tab label="SIGN IN" {...a11yProps(0)} />
            <Tab label="SIGN UP" {...a11yProps(1)} />
          </StyledTabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SignIn history={props.history} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp history={props.history} />
        </TabPanel>
      </TabsContainer>
    </FormContainer>
  );
}
