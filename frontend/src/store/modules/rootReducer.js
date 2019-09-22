import { combineReducers } from 'redux';

import auth from './auth/reducer';
import recipe from './recipe/reducer';

export default combineReducers({
  auth,
  recipe,
});
