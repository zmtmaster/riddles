import { set } from 'lodash/fp';

import {
  NEXT_LEVEL,
  RESET_LEVEL_COUNTER,
  BUY_ITEM,
} from '../actions/actionTypes';

const initialState = {
  qIndex: 0,
  coins: 100,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case NEXT_LEVEL: {
      return set('qIndex', state.qIndex + 1, state);
    }
    case RESET_LEVEL_COUNTER: {
      return set('qIndex', 0, state);
    }
    case BUY_ITEM: {
      return set('coins', state.coins - action.payload.amount, state);
    }
    default:
      break;
  }

  return state;
}
