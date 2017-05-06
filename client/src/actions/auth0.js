import { hashHistory } from 'react-router'
import AuthService from '../utils/AuthService'
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'


const authService = new AuthService('UdN-x_zIrEAok74rlhBGRDHcdJzASbC5', 'bartr.auth0.com')

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin(dispatch) {

  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      console.log('hi')
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return dispatch(loginError(error))
        } else {
          AuthService.setToken(authResult.idToken) // static method
          AuthService.setProfile(profile) // static method
          // axios.post(API_ENDPOINT + '/api/users')
          console.log('profile from auth0: ', profile);
          return dispatch(loginSuccess(profile))
        }
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

export function loginRequest() {
  authService.login()
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {

  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function logoutSuccess() {
  console.log('log out action creater invoked');
  return {
    type: LOGOUT_SUCCESS
  }
}