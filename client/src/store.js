import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

function createStoreWithMiddleware (prevState) {
  const middleware = [thunk, logger, sagaMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, prevState, composeEnhancers(
    applyMiddleware(...middleware)
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStoreWithMiddleware;
