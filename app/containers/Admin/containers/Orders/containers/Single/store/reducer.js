import {
  SET_ORDER,
  RESET
} from './types';

const INITIAL_STATE = {
  prder: {},
  isLoading: false
}

const HANDLERS = {
  [SET_ORDER]: (state, { payload }) => ({
    ...state,
    prder: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
