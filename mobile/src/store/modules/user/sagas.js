import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import { updateSuccess, updateFailure, createSuccess } from '~/store/modules/user/actions';
import { signInRequest } from '~/store/modules/auth/actions';

import api from '~/services/api';

export function* create({ payload }) {
  if (!payload) return;

  try {
    const { user } = payload;
    const response = yield call(api.post, 'users', user);

    console.tron.log('usuario', response.data)
    yield put(createSuccess(response.data));
    yield put(signInRequest(user.email, user.password));
  } catch (err) {
    Alert.alert('Error', `Falha no cadastro, verifique seus dados (${err.response.data.error})`);

    yield put(updateFailure());
  }
}

export function* update({ payload }) {
  if (!payload) return;

  console.tron.log(payload);

  try {
    const response = yield call(api.put, 'users', payload);

    const user = response.data;

    yield put(updateSuccess(user));
  } catch (err) {
    Alert.alert('Error', `Falha na atualização, verifique seus dados ${err}`);

    yield put(updateFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_REQUEST', update),
  takeLatest('@user/CREATE_REQUEST', create)
]);
