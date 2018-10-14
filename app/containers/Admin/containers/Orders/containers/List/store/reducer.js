import {
  SET_ORDERS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  RESET
} from './types';

const INITIAL_STATE = {
  orders: [],
  isLoading: false,
  isLoadingTable: false,
};

const HANDLERS = {
  [SET_ORDERS]: (state, { payload }) => ({
    ...state,
    orders: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_LOADING_TABLE]: (state, { payload }) => ({
    ...state,
    isLoadingTable: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
