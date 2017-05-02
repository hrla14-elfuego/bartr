import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ProfileReducer from './profileReducer';

const rootReducer = combineReducers({profile: ProfileReducer, routing: routerReducer});

export default rootReducer;