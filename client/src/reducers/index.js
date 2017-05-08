import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ProfileReducer from './profileReducer';
import Auth0 from './Auth0Reducer';
import AddressSearch from './AddressSearchReducer'

const rootReducer = combineReducers({
  routing,
  ProfileReducer,
  Auth0,
  AddressSearch
});

export default rootReducer;