import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ProfileReducer from './profileReducer';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  ProfileReducer,
  auth
});

export default rootReducer;