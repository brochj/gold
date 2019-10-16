import produce from 'immer';

const INITIAL_STATE = {
  recipe: {
    recipe: {
      id: null,
      name: null,
    },
    sections: [],
  },
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipe/RECIPE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipe/RECIPE_SUCCESS': {
        draft.recipe = action.payload.recipe;
        draft.loading = false;
        break;
      }
      case '@recipe/RECIPE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
