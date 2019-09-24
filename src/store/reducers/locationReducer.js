import * as _ from "lodash";

const setLocations = (state, payload) => {
  // console.log("Will set locations data:", payload.locations);

  const stateCopy = _.cloneDeep(state);
  stateCopy.locations = payload.locations;
  return stateCopy;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOCATIONS_ARE_LOADING":
      return { ...state };
    case "LOCATIONS_FETCH_DATA_SUCCESS":
      return setLocations(state, action);
    case "LOCATION_REMOVE":
      return state.filter((data, i) => i !== action.id);
    default:
      return state;
  }
};

export default reducer;
