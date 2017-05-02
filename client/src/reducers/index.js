import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ProfileReducer from './profileReducer';
// console.log("this is profile reducer in index line 5",ProfileReducer);

const rootReducer = combineReducers({ProfileReducer});

export default rootReducer;