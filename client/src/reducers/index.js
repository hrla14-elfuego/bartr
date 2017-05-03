import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ProfileReducer from './profileReducer';

const rootReducer = combineReducers({ProfileReducer, routing: routerReducer});

export default rootReducer;