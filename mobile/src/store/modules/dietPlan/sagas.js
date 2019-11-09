import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
  createDietPlanSuccess,
  getDietPlansSuccess,
  createDietPlanFailure,
} from '~/store/modules/dietPlan/actions';

import api from '~/services/api';

export function* create({ payload }) {
  if (!payload) return;

  try {
    const response = yield call(api.post, 'diet-plans', payload);
    const dietPlan = response.data;

    yield put(createDietPlanSuccess(dietPlan));
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha na criação do plano de dieta, verifique seus dados ${err}`
    );

    yield put(createDietPlanFailure());
  }
}

export function* getDietPlans() {

  try {
    const response = yield call(api.get, 'diet-plans');
    const dietPlans = response.data;

    yield put(getDietPlansSuccess(dietPlans));
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha em buscar os planos de dietas (${err.response.data.error})`
    );

    yield put(createDietPlanFailure());
  }
}

export function* deleteDietPlans({ payload }) {
  if (!payload) return;
  const { id } = payload;

  try {
    yield call(api.delete, `diet-plans/${id}`);
    
    const response = yield call(api.get, 'diet-plans');
    const dietPlans = response.data;

    yield put(getDietPlansSuccess(dietPlans));
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha em Deletar o Plano de dieta (${err.response.data.error})`
    );

    yield put(createDietPlanFailure());
  }
}

export default all([
  takeLatest('@dietPlan/CREATE_DIET_PLAN_REQUEST', create),
  takeLatest('@dietPlan/GET_DIET_PLANS_REQUEST', getDietPlans),
  takeLatest('@dietPlan/DELETE_DIET_PLAN_REQUEST', deleteDietPlans),
]);
