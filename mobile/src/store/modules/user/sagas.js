import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import { updateSuccess, updateFailure, createSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

export function* create({ payload }) {
  if (!payload) return;

  try {
    const { user } = payload;
    const response = yield call(api.post, 'users', user);

    yield put(createSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', `Falha no cadastro, verifique seus dados ${err}`);

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
