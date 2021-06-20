import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
const LayoutAdminStyled = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const PropsChildren = styled.div`
  display: block;
  @media (min-width: 600px) {
    margin-left: 260px;
  }
`;
function LayoutAdmin(props) {
  return (
    <LayoutAdminStyled>
      <Navbar />
      <PropsChildren>{props.children}</PropsChildren>
    </LayoutAdminStyled>
  );
}

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("UserAdmin"))
          return (
            <LayoutAdmin>
              <Component {...propsComponent} />
            </LayoutAdmin>
          );

        // dá về auth
        return <Redirect to="/admin" />;
      }}
    />
  );
}
