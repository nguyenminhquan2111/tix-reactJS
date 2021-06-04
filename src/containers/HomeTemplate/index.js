import NavbarHome from "component/HomeTemplate/NavbarHome/Navbar";
import React from "react";
import { Route } from "react-router-dom";

function LayoutHome(props) {
  return (
    <>
      <NavbarHome />
      {props.children}
    </>
  );
}

export default function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        return (
          <LayoutHome>
            <Component {...propsComponent} />
          </LayoutHome>
        );
      }}
    />
  );
}
