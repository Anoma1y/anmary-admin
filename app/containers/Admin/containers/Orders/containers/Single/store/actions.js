import {
  SET_ORDER,
  RESET
} from './types';
import { api } from 'lib/api';

export const setOrder = (value) => ({
  type: SET_ORDER,
  payload: value,
});

export const resetOrderSingle = () => ({ type: RESET });

export const pullOrder = (order_id) => (dispatch) => new Promise((resolve, reject) => {

  api.orders.getSingle(order_id)
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setOrder(data.data));
      resolve();
    })
    .catch(() => reject());

});
