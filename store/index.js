import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import asyncStorageMiddleware from '../middlewares/async-storage/async-storage';

export default function configureStore(preloadedState) {
  const middlewares = [thunk, asyncStorageMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];

  const store = createStore(rootReducer, preloadedState, compose(...enhancers));

  return store;
}
