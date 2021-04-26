import React, { useState } from "react";
import styled from "styled-components";
import ListMovie from "../ListMovie/ListMovie";
import ListMovieComing from "../ListMovieComing/ListMovieComing";

const List = styled.section`
  max-width: 80%;
  margin: 2rem auto;
`;
const TabTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;
const Nav = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  transition: all 0.2s;
  &:hover {
    font-size: 1.6rem;
    transform: translateY(-5%);
  }
  &.active {
    font-size: 1.6rem;
    transform: translateY(-5%);
    color: #fa5238;
  }
`;

export default function ShowingMovie() {
  const [state, setState] = useState(true);

  return (
    <List id="lichChieu">
      <TabTitle class="nav nav-tabs" id="nav-tab" role="tablist">
        <Nav
          onClick={() => {
            setState(true);
          }}
          className={!state ? "nav-item nav-link" : "nav-item nav-link active"}
          id="nav-home-tab"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          Đang chiếu
        </Nav>
        <Nav
          onClick={() => {
            setState(false);
          }}
          className={state ? "nav-item nav-link" : "nav-item nav-link active"}
          id="nav-profile-tab"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >
          Sắp chiếu
        </Nav>
      </TabTitle>
      <div className="tab-content" id="nav-tabContent">
        <div
          className={!state ? "tab-pane fade" : "tab-pane fade show active"}
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <ListMovie />
        </div>
        <div
          className={state ? "tab-pane fade" : "tab-pane fade show active"}
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <ListMovieComing />
        </div>
      </div>
    </List>
  );
}
