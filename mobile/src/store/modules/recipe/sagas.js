import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
  getRecipeSuccess,
  recipeFailure,
} from '~/store/modules/recipe/actions';

import api from '~/services/api';

export function* getRecipe({ payload }) {
  const { recipeId } = payload;

  try {
    const response = yield call(api.get, `recipes/${recipeId}`);

    const { sections, ...recipeRest } = response.data;

    const newSections = sections.map(section => {
      const { steps, ...rest } = section;

      const newSection = { data: steps, ...rest };

      return newSection;
    });

    yield put(getRecipeSuccess({ ...recipeRest, sections: newSections }));
  } catch (err) {
    Alert.alert(
      'Error',
      `Falha em carregar essa receita.`
      // `Falha em carregar essa receita. ${err.response.data.error}`
    );

    yield put(recipeFailure());
  }
}

export default all([takeLatest('@recipe/GET_RECIPE_REQUEST', getRecipe)]);
