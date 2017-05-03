import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

function createStoreWithMiddleware (prevState) {
  return createStore(
    rootReducer,
    prevState,
    applyMiddleware(thunk)
  )
};

export default createStoreWithMiddleware;
