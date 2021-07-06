import React from "react";
import styled from "styled-components";
import { Card, CardHeader, Avatar } from "@material-ui/core";

const CinemaBrand = styled.span`
  color: #8bc541;
`;
const CinemaPosition = styled.span`
  font-weight: 500;
`;
const CinemaAddress = styled.p`
  width: 190px;
  font-size: 12px;
  color: #949494;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function CinemaByBrandItem({ cinemaByBrand, cinemaLogo }) {
  const string = cinemaByBrand.tenCumRap.split("-");
  return (
    <Card style={{ marginBottom: "10px" }}>
      <CardHeader
        avatar={<Avatar src={cinemaLogo} alt={cinemaByBrand.tenCumRap} />}
        title={
          <>
            <CinemaBrand>
              {string[0] === "BHD Star Cineplex " ? "BHD Star " : string[0]}
            </CinemaBrand>
            - <CinemaPosition>{string[1]}</CinemaPosition>
          </>
        }
        subheader={<CinemaAddress>{cinemaByBrand.diaChi}</CinemaAddress>}
      />
    </Card>
  );
}
