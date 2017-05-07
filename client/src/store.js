import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function createStoreWithMiddleware (prevState) {
  const middleware = [thunk, logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, prevState, composeEnhancers(
    applyMiddleware(...middleware)
  ));
};

export default createStoreWithMiddleware;
