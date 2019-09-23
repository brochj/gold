export function updateRequest(user) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: user,
  };
}

export function updateSuccess(user) {
  return {
    type: '@user/update_SUCCESS',
    payload: user,
  };
}

export function updateFailure() {
  return {
    type: '@user/update_FAILURE',
  };
}
