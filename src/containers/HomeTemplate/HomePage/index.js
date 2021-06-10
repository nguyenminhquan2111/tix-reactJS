import ModalComponent from "component/HomeTemplate/Modal/Modal";
import React from "react";
import Banner from "../../../component/HomeTemplate/HomePageComponent/Banner/Banner";
import Cinema from "../../../component/HomeTemplate/HomePageComponent/Cinema/Cinema";
import ShowingMovie from "../../../component/HomeTemplate/HomePageComponent/ShowingMovie/ShowingMovie";
import "../mainSCSS/css/style.css";

export default function index() {
  return (
    <>
      <Banner />
      <ShowingMovie />
      <Cinema />
      <ModalComponent />
    </>
  );
}
