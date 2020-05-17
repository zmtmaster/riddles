import { AsyncStorage } from 'react-native';
import {
  GET_TIME,
  GET_TIME_SUCCESS,
  SET_TIME,
  SET_TIME_SUCCESS,
  GET_COINS,
  GET_COINS_SUCCESS,
  SET_COINS,
  SET_COINS_SUCCESS,
  INITIALIZE,
} from '../../actions/actionTypes';
import { ASYNC_KEYS } from '../../constants/internals';

async function getValue(key) {
  return await AsyncStorage.getItem(key);
}

async function setValue($key, $value) {
  await AsyncStorage.setItem($key, $value);
}

const asyncStorageMiddleware = (store) => (next) => (action) => {
  next(action);

  const { type } = action;
  const { dispatch } = store;

  switch (type) {
    case GET_TIME: {
      dispatch(async function () {
        const value = await getValue(ASYNC_KEYS.BEST);

        if (value) {
          dispatch({ type: GET_TIME_SUCCESS, payload: value });
        }
      });
      break;
    }
    case SET_TIME: {
      dispatch(async function () {
        await setValue(ASYNC_KEYS.BEST, action.payload);

        dispatch({ type: SET_TIME_SUCCESS, payload: action.payload });
      });
      break;
    }
    case GET_COINS: {
      dispatch(async function () {
        const value = await getValue(ASYNC_KEYS.COINS);

        if (value) {
          dispatch({ type: GET_COINS_SUCCESS, payload: value });
        }
      });
      break;
    }
    case SET_COINS: {
      dispatch(async function () {
        await setValue(ASYNC_KEYS.COINS, action.payload);

        dispatch({ type: SET_COINS_SUCCESS, payload: action.payload });
      });
      break;
    }
    case INITIALIZE: {
      dispatch(async function () {
        dispatch({ type: GET_TIME });
        dispatch({ type: GET_COINS });
      });
      break;
    }
    default:
      break;
  }
};

export default asyncStorageMiddleware;
