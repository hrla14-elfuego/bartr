import * as action from '../actions/actionTypes';
import AuthService from '../utils/AuthService';

export default function Auth0Reducer(state = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null
}, action) {
  switch (action.type) {
    case action.LOGIN_REQUEST:
      return {...state, isFetching: true, error: null}
    case action.LOGIN_SUCCESS:
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
    case action.LOGIN_ERROR:
      return {...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error}
    case action.LOGOUT_SUCCESS:
      return {...state, isAuthenticated: false, profile: {}}
    default:
      return state
  }
}