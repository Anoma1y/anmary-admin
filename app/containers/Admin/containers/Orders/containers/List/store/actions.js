import {
  SET_ORDERS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setOrders = (value) => ({
  type: SET_ORDERS,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsLoadingTable = (value) => ({
  type: SET_IS_LOADING_TABLE,
  payload: value,
});

export const resetOrdersList = () => ({ type: RESET });

export const pullOrders = () => (dispatch) => new Promise((resolve, reject) => {

  dispatch(setIsLoadingTable(true));
  api.orders.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setOrders(data.data.records));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoadingTable(false)));
});
