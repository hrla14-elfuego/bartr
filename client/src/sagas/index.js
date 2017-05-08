import { put, all, call, takeEvery, takeLatest } from 'redux-saga/effects'
import * as action from '../actions/actionTypes';
import axios from "axios";
import * as authSagas from './Auth0Sagas';

// Our worker Saga: will perform the async increment task
export function* postUserTokenAsync() {
  const config = {
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
    method: 'post',
    url: API_ENDPOINT + '/api/users', config
  };
  yield call(axios, config)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchTokenAsync() {
  yield takeEvery(action.TOKEN_PERSISTED, postUserTokenAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchTokenAsync(),
    authSagas.watchLoginFailure(),
    authSagas.watchLoginRequest(),
    authSagas.watchLoginSuccess(),
    authSagas.watchLogout()
  ])
}