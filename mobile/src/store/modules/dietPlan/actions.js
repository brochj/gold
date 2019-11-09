export function createDietPlanRequest(dietPlan) {
  return {
    type: '@dietPlan/CREATE_DIET_PLAN_REQUEST',
    payload: dietPlan,
  };
}

export function createDietPlanSuccess(dietPlan) {
  return {
    type: '@dietPlan/CREATE_DIET_PLAN_SUCCESS',
    payload: dietPlan,
  };
}

export function getDietPlansRequest() {
  return {
    type: '@dietPlan/GET_DIET_PLANS_REQUEST',
  };
}

export function getDietPlansSuccess(dietPlans) {
  return {
    type: '@dietPlan/GET_DIET_PLANS_SUCCESS',
    payload: { dietPlans },
  };
}

export function deleteDietPlanRequest(id) {
  return {
    type: '@dietPlan/DELETE_DIET_PLAN_REQUEST',
    payload: { id },
  };
}

export function deleteDietPlanSuccess(dietPlans) {
  return {
    type: '@dietPlan/DELETE_DIET_PLAN_SUCCESS',
    payload: { dietPlans },
  };
}

export function createDietPlanFailure() {
  return {
    type: '@dietPlan/DIET_PLAN_FAILURE',
  };
}
