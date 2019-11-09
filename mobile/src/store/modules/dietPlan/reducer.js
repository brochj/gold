import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  dietPlans: [],
  objective: 'maintainWeight',
  calorieGoal: null,
  calorieIntake: null,
  physicalActivity: 'light',
  loading: false,
};

export default function dietPlan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@dietPlan/CREATE_DIET_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dietPlan/CREATE_DIET_PLAN_SUCCESS': {
        draft.id = action.payload.id;
        draft.objective = action.payload.objective;
        draft.calorieGoal = action.payload.calorie_goal;
        draft.calorieIntake = action.payload.calorie_intake;
        draft.physicalActivity = action.payload.physical_activity;
        draft.loading = false;
        break;
      }
      case '@dietPlan/GET_DIET_PLANS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dietPlan/GET_DIET_PLANS_SUCCESS': {
        draft.dietPlans = action.payload.dietPlans;
        draft.loading = false;
        break;
      }
      case '@dietPlan/DELETE_DIET_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dietPlan/DELETE_DIET_PLAN_SUCCESS': {
        draft.dietPlans = action.payload.dietPlans;
        draft.loading = false;
        break;
      }
      case '@dietPlan/DIET_PLAN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@dietPlan/CHANGE_ACTIVE_DIET_PLAN': {
        const { id } = action.payload;
        console.tron.log(id);
        console.tron.log(draft.dietPlans);
        const dietPlan = draft.dietPlans.find(diet => diet.id === id);
        draft.id = dietPlan.id;
        draft.objective = dietPlan.objective;
        draft.calorieGoal = dietPlan.calorie_goal;
        draft.calorieIntake = dietPlan.calorie_intake;
        draft.physicalActivity = dietPlan.physical_activity;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.objective = 'maintainWeight';
        draft.calorieGoal = null;
        draft.calorieIntake = null;
        draft.physicalActivity = 'light';
        break;
      }

      default:
        break;
    }
  });
}
