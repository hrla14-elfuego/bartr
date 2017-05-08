import * as action from './actionTypes'

export const loginRequest = () => (
  {
    type: action.LOGIN_REQUEST,
  }
);

export const loginSuccess = (profile, idToken) => (
  {
    type: action.LOGIN_SUCCESS,
    profile,
    idToken,
  }
);

export const loginFailure = error => (
  {
    type: action.LOGIN_FAILURE,
    error,
  }
);

export const logout = () => (
  {
    type: action.LOGOUT,
  }
);
