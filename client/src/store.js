import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

import ProfileReducer from './reducers/profileReducer';

const store = createStore(rootReducer);
console.log(store);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;