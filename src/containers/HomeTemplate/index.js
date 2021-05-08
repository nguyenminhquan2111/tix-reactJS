import React from "react";
import { Route } from "react-router-dom";
import NavbarHome from "../../component/NavbarHome/Navbar";

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
