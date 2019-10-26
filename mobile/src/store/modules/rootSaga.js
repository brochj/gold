import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import dietPlan from './dietPlan/sagas';
import meal from './meal/sagas';
import dish from './dish/sagas';
import recipe from './recipe/sagas';

export default function* rootSaga() {
  return yield all([auth, user, dietPlan, meal, dish, recipe]);
}
