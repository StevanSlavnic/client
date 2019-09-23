export function locationCreating(location) {
  console.log(location);
  return {
    type: "LOCATIONS_CREATE",
    location
  };
}

export function locationEditing(id, location) {
  console.log(location);
  return {
    type: "LOCATIONS_EDITING",
    id,
    location
  };
}

export function locationDeleting(id) {
  return {
    type: "LOCATIONS_DELETING",
    id
  };
}

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

export function locationEdit(id, location) {
  return dispatch => {
    dispatch(locationEditing(id, location));
    fetch(id, location);
  };
}

export function locationRemove(id) {
  return dispatch => {
    dispatch(locationDeleting(id));
    fetch(id);
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
