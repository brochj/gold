export function createDishRequest(dish, dietPlanId, mealId) {
  return {
    type: '@dish/CREATE_DISH_REQUEST',
    payload: { dish, dietPlanId, mealId },
  };
}

export function createDishSuccess(dish) {
  return {
    type: '@dish/CREATE_DISH_SUCCESS',
    payload: dish,
  };
}

export function getDishesRequest(dietPlanId, mealId) {
  return {
    type: '@dish/GET_DISHES_REQUEST',
    payload: { dietPlanId, mealId },
  };
}

export function getDishesSuccess(dishes) {
  return {
    type: '@dish/GET_DISHES_SUCCESS',
    payload: dishes,
  };
}

export function createDishFailure() {
  return {
    type: '@dish/DISH_FAILURE',
  };
}
