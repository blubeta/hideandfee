import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import reducer from "./reducer";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);

const configureStore = (initialState = {}, history) => {
  let middlewares = [
    promise(),
    routerMiddleware(history),
    thunk,
  ];

  if (process.env.APP_ENV !== 'production') middlewares.push(logger);

  let enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.APP_ENV !== 'production') enhancers.push(devtools())

  const store = createStore(
    reducer,
    initialState,
    compose(...enhancers)
  );

  return {
    store,
  };
}

export default configureStore;
