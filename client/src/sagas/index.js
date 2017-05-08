import { put, all, call, takeEvery, takeLatest } from 'redux-saga/effects'
import * as action from '../actions/actionTypes';
import axios from "axios";

// Our worker Saga: will perform the async increment task
export function* postUserAsync() {
  const config = {
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
    method: 'post',
    url: API_ENDPOINT + '/api/users', config
  };
  yield call(axios, config)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoginAsync() {
  yield takeEvery(action.LOGIN_SUCCESS, postUserAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchLoginAsync()
  ])
}