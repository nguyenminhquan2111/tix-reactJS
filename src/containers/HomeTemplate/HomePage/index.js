import React from "react";
import "../mainSCSS/css/style.css";
import Banner from "../../../component/HomeTemplate/HomePageComponent/Banner/Banner";
import ShowingMovie from "../../../component/HomeTemplate/HomePageComponent/ShowingMovie/ShowingMovie";

export default function index() {
  return (
    <>
      <Banner />
      <ShowingMovie />
    </>
  );
}
