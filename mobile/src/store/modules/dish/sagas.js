import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
  createDishSuccess,
  createDishFailure,
  getDishesSuccess,
} from '~/store/modules/dish/actions';

import api from '~/services/api';

export function* createDish({ payload }) {
  if (!payload) return;

  const { dish, dietPlanId, mealId } = payload;

  try {
    const response = yield call(
      api.post,
      `diet-plans/${dietPlanId}/meals/${mealId}/dishes`,
      dish
    );

    yield put(createDishSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', `Falha na criação do prato (opção) ${err}`);

    yield put(createDishFailure());
  }
}

export function* getDishes({ payload }) {
  if (!payload) return;

  const { dietPlanId, mealId } = payload;

  try {
    const response = yield call(
      api.get,
      `diet-plans/${dietPlanId}/meals/${mealId}/dishes`
    );

    yield put(getDishesSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', `Falha na listagem dos pratos. ${err}`);

    yield put(createDishFailure());
  }
}

export default all([
  takeLatest('@dish/CREATE_DISH_REQUEST', createDish),
  takeLatest('@dish/GET_DISHES_REQUEST', getDishes),
]);
