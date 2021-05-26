import React from "react";
import styled from "styled-components";

const CinemaWrapper = styled.div`
  padding: 0 1rem;
`;
const CinemaWrapperContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.4rem 0;
  border-bottom: 1px solid #ebebec;
`;
const CinemaImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
`;
const CinemaContainer = styled.div``;
const CinemaTitle = styled.p`
  font-size: 14px;
  margin: 0;
`;
const CinemaBrand = styled.span`
  color: #8bc541;
`;
const CinemaPosition = styled.span`
  font-weight: 600;
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
    <CinemaWrapper>
      <CinemaWrapperContainer>
        <CinemaImage src={cinemaLogo} alt={cinemaByBrand.tenCumRap} />
        <CinemaContainer>
          <CinemaTitle>
            <CinemaBrand>
              {string[0] === "BHD Star Cineplex " ? "BHD Star " : string[0]}
            </CinemaBrand>
            -<CinemaPosition>{string[1]}</CinemaPosition>
          </CinemaTitle>
          <CinemaAddress>{cinemaByBrand.diaChi}</CinemaAddress>
        </CinemaContainer>
      </CinemaWrapperContainer>
    </CinemaWrapper>
  );
}
