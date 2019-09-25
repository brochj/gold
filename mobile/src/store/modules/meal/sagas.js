import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
  createMealSuccess,
  createMealFailure,
  createMultipleMealsSuccess,
} from '~/store/modules/meal/actions';

import api from '~/services/api';

export function* createMeal({ payload }) {
  if (!payload) return;

  const {
    meal: { calorie },
    meal: { title },
    dietPlanId,
  } = payload;

  try {
    const response = yield call(api.post, `diet-plans/${dietPlanId}/meals`, {
      calorie,
      title,
    });

    yield put(createMealSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha na criação da refeição, verifique seus dados ${err}`
    );

    yield put(createMealFailure());
  }
}

export function* createMultipleMeals({ payload }) {
  if (!payload) return;

  const { meals, dietPlanId } = payload;

  try {
    yield meals.forEach(meal => {
      call(api.post, `diet-plans/${dietPlanId}/meals`, meal);
    });

    yield put(createMultipleMealsSuccess());
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha na criação das refeições, verifique seus dados ${err}`
    );

    yield put(createMealFailure());
  }
}

export default all([
  takeLatest('@meal/CREATE_MEAL_REQUEST', createMeal),
  takeLatest('@meal/CREATE_MULTIPLE_MEALS_REQUEST', createMultipleMeals),
]);
