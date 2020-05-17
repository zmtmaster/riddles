import { AsyncStorage } from 'react-native';
import {
  GET_TIME,
  GET_TIME_SUCCESS,
  SET_TIME,
  SET_TIME_SUCCESS,
} from '../../actions/actionTypes';

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
        const value = await getValue('best');

        if (value) {
          dispatch({ type: GET_TIME_SUCCESS, payload: value });
        }
      });
      break;
    }
    case SET_TIME: {
      dispatch(async function () {
        await setValue('best', action.payload);

        dispatch({ type: SET_TIME_SUCCESS, payload: action.payload });
      });
      break;
    }
    default:
      break;
  }
};

export default asyncStorageMiddleware;
