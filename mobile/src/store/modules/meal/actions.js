export function createMealRequest(meal, dietPlanId) {
  return {
    type: '@meal/CREATE_MEAL_REQUEST',
    payload: { meal, dietPlanId },
  };
}

export function createMealSuccess(meal) {
  return {
    type: '@meal/CREATE_MEAL_SUCCESS',
    payload: meal,
  };
}

export function createMultipleMealsRequest(meals, dietPlanId) {
  return {
    type: '@meal/CREATE_MULTIPLE_MEALS_REQUEST',
    payload: { meals, dietPlanId },
  };
}

export function createMultipleMealsSuccess() {
  return {
    type: '@meal/CREATE_MULTIPLE_MEALS_SUCCESS',
  };
}

export function createMealFailure() {
  return {
    type: '@meal/MEAL_FAILURE',
  };
}