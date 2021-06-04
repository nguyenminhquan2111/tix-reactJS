import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabPanelThongTin from "./ThongTin";
import TabPanelDanhGia from "./DanhGia";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#0a2029",
    paddingBottom: "3rem",
  },
}));
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const TabStyled = styled(Tab)`
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s linear;
  color: #fff !important;
  &.Mui-selected {
    color: #fb4226 !important;
    font-size: 3rem;
  }
  &:hover {
    font-size: 3rem;
  }
`;
const TabPanelStyled = styled(TabPanel)`
  color: #fff;
  max-width: 870px;
  margin: 0 auto;
  animation: 1s ${fadeIn} ease-out;
`;

const AppBarStyled = styled(AppBar)`
  background-color: transparent !important;
  box-shadow: none !important;
  position: absolute !important;
  z-index: 1 !important;
  transform: translateY(-60px) !important;
  @media (max-width: 736px) {
    transform: translateY(-10px) !important;
    position: relative !important;
  }
`;

function DetailMiddle(props) {
  const { movie } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBarStyled position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="false"
          aria-label="simple tabs example"
          centered
        >
          <TabStyled label="Thông tin" {...a11yProps(0)} />
          <TabStyled label="Đánh giá" {...a11yProps(1)} />
        </Tabs>
      </AppBarStyled>
      <TabPanelStyled value={value} index={0}>
        <TabPanelThongTin movie={movie}></TabPanelThongTin>
      </TabPanelStyled>
      <TabPanelStyled value={value} index={1} className="DanhGia">
        <TabPanelDanhGia movie={movie}></TabPanelDanhGia>
      </TabPanelStyled>
    </div>
  );
}
export default memo(DetailMiddle);
