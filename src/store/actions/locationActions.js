import * as actionTypes from "./actionTypes";

export function locationsAreLoading(bool) {
  return {
    type: "LOCATIONS_ARE_LOADING",
    isLoading: bool
  };
}

export function locationsFetchDataSuccess(locations) {
  return {
    type: "LOCATIONS_FETCH_DATA_SUCCESS",
    locations
  };
}

export function locationDelete(id) {
  return {
    type: actionTypes.LOCATION_DELETE,
    id: id
  };
}

export function locationsFetchData(url) {
  return dispatch => {
    dispatch(locationsAreLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(locationsAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(locations => dispatch(locationsFetchDataSuccess(locations)));
  };
}
