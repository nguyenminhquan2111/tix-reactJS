import React from "react";
import "../mainSCSS/css/style.css";
import Banner from "../../../component/HomeTemplate/HomePageComponent/Banner/Banner";
import ListMovie from "../../../component/HomeTemplate/HomePageComponent/ListMovie/ListMovie";

export default function index() {
  return (
    <>
      <Banner />
      <ListMovie />
    </>
  );
}
