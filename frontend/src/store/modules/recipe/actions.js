export function recipeRequest(id) {
  return {
    type: '@recipe/RECIPE_REQUEST',
    payload: { id },
  };
}

export function recipeSuccess(recipe) {
  return {
    type: '@recipe/RECIPE_SUCCESS',
    payload: { recipe },
  };
}

export function recipeFailure() {
  return {
    type: '@recipe/RECIPE_FAILURE',
  };
}
