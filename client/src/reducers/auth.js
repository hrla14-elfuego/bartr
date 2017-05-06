// this import isn't working
// need to figure out how to import action types
// import { loginSuccess, loginError, loginRequest, logoutSuccess } from '../actions/auth0';
import AuthService from '../utils/AuthService';

export default function authReducer(state = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null
}, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {...state, isFetching: true, error: null}
    case 'LOGIN_SUCCESS':
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
    case 'LOGIN_ERROR':
      return {...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error}
    case 'LOGOUT_SUCCESS':
      return {...state, isAuthenticated: false, profile: {}}
    default:
      return state
  }
}