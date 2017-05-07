import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ProfileReducer from './profileReducer';
import auth from './auth';
import AddressSearch from './AddressSearchReducer'

const rootReducer = combineReducers({
  routing,
  ProfileReducer,
  auth,
  AddressSearch
});

export default rootReducer;