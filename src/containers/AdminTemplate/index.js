import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../../component/AdminTemplate/Navbar";
import Appbar from "../../component/AdminTemplate/Appbar";
import styled from "styled-components";
const LayoutAdminStyled = styled.div`
  display: flex;
  flex-direction: row;
  .navbar {
    display: block;
  }
  .appbar {
    display: none;
  }
  @media (max-width: 960px) {
    flex-direction: column;
    .navbar {
      display: none;
    }
    .appbar {
      display: block;
    }
  }
`;
const PropsChildren = styled.div`
  display: block;
  @media (min-width: 960px) {
    margin-left: 260px;
  }
`;

function LayoutAdmin(props) {
  return (
    <LayoutAdminStyled>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="appbar">
        <Appbar />
      </div>

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
