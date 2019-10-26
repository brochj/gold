import produce from 'immer';

const INITIAL_STATE = {
  recipe: {},
  loading: false,
};

export default function meal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipe/GET_RECIPE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipe/GET_RECIPE_SUCCESS': {
        draft.recipe = action.payload.recipe;
        draft.loading = false;
        break;
      }
      case '@recipe/RECIPE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
