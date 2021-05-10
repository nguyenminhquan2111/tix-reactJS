import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actFetchListCinemaChain } from "./modules/actions";

export default function ListCinemaChain() {
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

  console.log(data);
}
