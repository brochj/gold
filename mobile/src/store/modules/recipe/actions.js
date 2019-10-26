export function getRecipeRequest(recipeId) {
  return {
    type: '@recipe/GET_RECIPE_REQUEST',
    payload: { recipeId },
  };
}

export function getRecipeSuccess(recipe) {
  return {
    type: '@recipe/GET_RECIPE_SUCCESS',
    payload: { recipe },
  };
}

export function recipeFailure() {
  return {
    type: '@recipe/RECIPE_FAILURE',
  };
}
