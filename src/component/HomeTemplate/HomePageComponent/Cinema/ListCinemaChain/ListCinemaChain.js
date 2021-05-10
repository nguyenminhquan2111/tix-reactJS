/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actFetchListCinemaChain } from "./modules/actions";

const CinemaItem = styled.div`
  width: 5rem;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  margin: 0.5rem;
`;

const CinemaImage = styled.img`
  height: 100%;
  width: 100%;
`;

export default function ListCinemaChain() {
  const [cinemaId, setCinemaId] = useState();

  const state = useSelector((state) => {
    return {
      isLoading: state.listCinemaChainReducer.loading,
      data: state.listCinemaChainReducer.data,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListCinemaChain());
  }, []);

  const { data } = state;

  const renderListCinemaChain = () => {
    return (
      data &&
      data.map((item, index) => {
        return (
          <CinemaItem key={index}>
            <CinemaImage src={item.logo} />
          </CinemaItem>
        );
      })
    );
  };

  console.log(data);

  return <div>{renderListCinemaChain()}</div>;
}
