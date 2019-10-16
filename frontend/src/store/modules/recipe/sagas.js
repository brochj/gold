import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { recipeSuccess, recipeFailure } from './actions';

export function* getRecipe({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `recipes/${id}`);

    history.push(`/recipes/${id}`);
    yield put(recipeSuccess(response.data));

  } catch (eer) {
    toast.error('Get Recipe Failed');
    yield put(recipeFailure());
  }
}

// all é pra ficar ouvindo as actions
export default all([takeLatest('@recipe/RECIPE_REQUEST', getRecipe)]);
