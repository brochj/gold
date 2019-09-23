import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  email: null,
  birthday: null,
  gender: null,
  weight: null,
  height: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.user.id;
        draft.name = action.payload.user.name;
        draft.email = action.payload.user.email;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/UPDATE_SUCCESS': {
        draft.id = action.payload.user.id;
        draft.name = action.payload.user.name;
        draft.email = action.payload.user.email;
        draft.birthday = action.payload.user.birthday;
        draft.gender = action.payload.user.gender;
        draft.weight = action.payload.user.weight;
        draft.height = action.payload.user.height;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
