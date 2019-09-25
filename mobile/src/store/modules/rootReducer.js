import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import dietPlan from './dietPlan/reducer';

export default combineReducers({
  auth,
  user,
  dietPlan,
});
