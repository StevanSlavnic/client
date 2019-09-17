import * as actionTypes from "../actions/actionTypes";

// reducers for auth actions

const initialState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  loading: true
};

const authStart = state => {
  return {
    ...state,
    loading: true,
    error: null
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    accessToken: action.authData["token"],
    refreshToken: action.authData["refresh_token"],
    error: null,
    loading: false
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    accessToken: null,
    refreshToken: null,
    error: action,
    loading: false
  };
};

export const authLogout = (state, action) => {
  return {
    ...state,
    accessToken: null,
    refreshToken: null,
    loading: false
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
