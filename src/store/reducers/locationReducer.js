import * as _ from "lodash";

const createLocation = (state, payload) => {
  console.log(state);

  const newLocation = payload.location;

  console.log(newLocation);

  // make a copy
  const newLocations = state.locations.slice();

  newLocations.splice(0, 0, newLocation);

  return { ...state, locations: newLocations };
};

const editLocation = (state, payload) => {
  console.log(payload);
  const newLocations = state.locations.map((location, index) => {
    // Find the location with the matching id
    if (location.id === payload.id) {
      const payloadCopy = _.cloneDeep(payload);

      console.log(payloadCopy);
      // Return a new object
      return {
        ...location, // copy the existing location
        title: payloadCopy.location.title,
        description: payloadCopy.location.description,
        address: payloadCopy.location.address,
        street_number: payloadCopy.location.street_number,
        city: payloadCopy.location.city,
        state: payloadCopy.location.state,
        zip_code: payloadCopy.location.zip_code
      };
    }
    return location;
  });
  //Returns new state
  console.log(newLocations);
  return { ...state, locations: newLocations };
};

const removeLocation = (state, payload) => {
  console.log(payload.id);
  const newLocations = state.locations.filter(
    location => payload.id !== location.id
  );
  return { ...state, locations: newLocations };
};

const setLocations = (state, payload) => {
  const stateCopy = _.cloneDeep(state);
  stateCopy.locations = payload.locations;
  return stateCopy;
};

const setLocationsFiltered = (state, payload) => {
  const stateCopy = _.cloneDeep(state);
  stateCopy.locations = payload.locations;
  return stateCopy;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOCATIONS_FETCH_DATA_SUCCESS":
      return setLocations(state, action);
    case "LOCATIONS_FETCH_DATA_FILTERED":
      return setLocationsFiltered(state, action);
    case "LOCATIONS_DELETING":
      return removeLocation(state, action);
    case "LOCATIONS_EDITING":
      return editLocation(state, action);
    case "LOCATIONS_CREATE":
      return createLocation(state, action);
    default:
      return state;
  }
};

export default reducer;
