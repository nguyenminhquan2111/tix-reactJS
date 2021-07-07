import React from "react";
import styled from "styled-components";

const TabImage = styled.div`
  cursor: pointer;
  width: 5.5rem;
  height: 5.5rem;
  padding: 1.2rem 1.2rem 0 1.2rem;
  & img {
    width: 100%;
    height: 100%;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #ebebec;
  }
`;

export default function CinemaBrandItem({ cinemaBrand }) {
  return (
    <TabImage>
      <img src={cinemaBrand.logo} alt={cinemaBrand.biDanh} />
    </TabImage>
  );
}
