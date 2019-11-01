import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';
import { updateRequest } from '~/store/modules/user/actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // put é para disparar actions
    yield put(signInSuccess(token, user));
    yield put(updateRequest({ email }));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha na autenticação, verifique seus dados. (${err.response.data.error})`
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', { name, email, password });

    // history.push('/');
  } catch (err) {
    Alert.alert('Error', 'Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// all é pra ficar ouvindo as actions
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
