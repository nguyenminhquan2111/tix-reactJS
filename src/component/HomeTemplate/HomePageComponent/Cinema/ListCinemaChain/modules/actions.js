import * as ActionType from "./constants";
import axios from "axios";
import { URL_LIST_CINEMA_CHAIN } from "../../URL";

export const actFetchListCinemaChain = () => {
  return (dispatch) => {
    dispatch(actListCinemaChainRequest());
    axios({
      url: URL_LIST_CINEMA_CHAIN,
      method: "GET",
    })
      .then((res) => {
        dispatch(actListCinemaChainSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actListCinemaChainFailed(err));
      });
  };
};

const actListCinemaChainRequest = () => {
  return {
    type: ActionType.LIST_CINEMA_CHAIN_REQUEST,
  };
};

const actListCinemaChainSuccess = (data) => {
  return {
    type: ActionType.LIST_CINEMA_CHAIN_SUCCESS,
    payload: data,
  };
};

const actListCinemaChainFailed = (err) => {
  return {
    type: ActionType.LIST_CINEMA_CHAIN_FAILED,
    payload: err,
  };
};
