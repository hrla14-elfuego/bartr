import Auth0Lock from 'auth0-lock';
import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Immutable from 'immutable';
import * as action from '../actions/actionTypes'
import { hashHistory } from 'react-router';


import { setStoredAuthState, removeStoredAuthState } from '../utils/Auth0Utils';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from '../reducers/Auth0Reducer';
import swal from 'sweetalert'

export function* loginRequestSaga() {
  const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, { auth: { redirect: false } });

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) {
            const immutableProfile = Immutable.fromJS(profile);

            lock.hide();
            resolve({ profile: immutableProfile, idToken: authResult.idToken });
          }
        });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });

      lock.show();
    });

  try {
    const { profile, idToken } = yield call(showLock);
    yield put(loginSuccess(profile, idToken));
    console.log('push new location')
    // yield put(push('/'));
    hashHistory.push('/')
  } catch (error) {
    yield put(loginFailure(error));
    // yield put(push('/'));
  }
}

export function* watchLoginRequest() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield call(loginRequestSaga);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { profile, idToken } = yield take(LOGIN_SUCCESS);
    setStoredAuthState(profile, idToken);
    yield put({type: action.TOKEN_PERSISTED})
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);
    removeStoredAuthState();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthState();

    // yield put(push('/'));
    hashHistory.push('/')
    swal({
      title: 'Logout Successful!',
      type: 'success'
    });
  }
}