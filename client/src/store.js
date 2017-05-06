import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function createStoreWithMiddleware (prevState) {
  const middleware = [thunk, logger];
  return createStore(
    rootReducer,
    prevState,
    applyMiddleware(...middleware)
  )
};

export default createStoreWithMiddleware;
