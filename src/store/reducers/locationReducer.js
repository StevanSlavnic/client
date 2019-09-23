import * as _ from "lodash";

const createLocation = (state, payload) => {
  console.log(state);

  const newLocation = payload.location;

  console.log(newLocation);

  // make a copy
  const newLocations = state.locations;

  newLocations.push(newLocation);

  return { ...state, locations: newLocations };
};

const editLocation = (state, payload) => {
  const newLocations = state.locations.map((location, index) => {
    // Find the location with the matching id
    if (location.id === payload.id) {
      // Return a new object

      return {
        ...location, // copy the existing location
        title: payload.location.title,
        description: payload.location.description,
        address: payload.location.address,
        street_number: payload.location.street_number,
        city: payload.location.city,
        state: payload.location.state,
        zip_code: payload.location.zip_code
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
  console.log("Will set locations data:", payload.locations);

  const stateCopy = _.cloneDeep(state);
  stateCopy.locations = payload.locations;
  return stateCopy;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOCATIONS_FETCH_DATA_SUCCESS":
      return setLocations(state, action);
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
