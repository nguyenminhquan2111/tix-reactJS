import React, { useState } from "react";
// import { useMediaQuery } from "react-responsive";
import { MenuItems, LoginItems, Location } from "../MenuItems/MenuItem";
import { NavLink } from "react-router-dom";
import "./css/navbar.css";

export default function NavbarHome() {
  const [clicked, setClicked] = useState(false);

  const renderMenuItem = () => {
    return MenuItems.map((item, index) => {
      return (
        <li key={index}>
          <a className={item.className} href={item.url}>
            {item.title}
          </a>
        </li>
      );
    });
  };
  const renderLocation = () => {
    return Location.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  const renderLogin = () => {
    return LoginItems.map((item, index) => {
      return (
        <NavLink key={index} to={item.url} className={item.className}>
          Đăng Nhập
        </NavLink>
      );
    });
  };

  return (
    <nav className="navbar ">
      <h1 className="navbar__logo">React</h1>
      <div
        className="btn__show"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <div
        className={
          clicked ? "navbar__menu__center  active" : "navbar__menu__center"
        }
      >
        <li className="login__mobile">
          <i className="fas fa-user-circle" />
          {renderLogin()}
        </li>
        {renderMenuItem()}
        <div className="navbar__location__mobile">
          <select name="location" className="custom-select location__title">
            {renderLocation()}
          </select>
        </div>
      </div>

      <div className="navbar__menu__right">
        <div className="login__desktop">
          <i className="fas fa-user-circle" />
          {renderLogin()}
        </div>

        <div className="navbar__location">
          <i className="fas fa-map-marker-alt" />
          <select name="location" className="custom-select location__title">
            {renderLocation()}
          </select>
        </div>
      </div>
    </nav>
  );
}
