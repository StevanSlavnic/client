// declaratively defining action type names reduces the chance of a naming errors happening inside the reducers and actions

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const USER_SET_LOGGED = "USER_SET_LOGGED";
export const USER_UNSET_LOGGED = "USER_UNSET_LOGGED";

export const LOCATIONS_CREATE = "LOCATIONS_CREATE";
export const LOCATIONS_EDITING = "LOCATIONS_EDITING";
export const LOCATIONS_DELETING = "LOCATIONS_DELETING";

export const LOCATIONS_FETCH_DATA_SUCCESS = "LOCATIONS_FETCH_DATA_SUCCESS";
export const LOCATIONS_FETCH_DATA_FILTERED = "LOCATIONS_FETCH_DATA_FILTERED";
