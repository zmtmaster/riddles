import { set } from 'lodash/fp';

import {
  NEXT_LEVEL,
  RESET_LEVEL_COUNTER,
  BUY_ITEM,
  GET_TIME_SUCCESS,
  SET_TIME_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  qIndex: 0,
  coins: 100,
  best: '00:00',
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
    case SET_TIME_SUCCESS: {
      return set('best', action.payload, state);
    }
    case GET_TIME_SUCCESS: {
      return set('best', action.payload, state);
    }
    default:
      break;
  }

  return state;
}
