import * as _ from "lodash";

const setLocations = (state, payload) => {
  console.log("Will set locations data:", payload.locations);

  const stateCopy = _.cloneDeep(state);
  stateCopy.locations = payload.locations;
  return stateCopy;
};

// const reducer = (state = { isFetching: false }, action) => {
//   switch (action.type) {
//     case "LOCATIONS_ARE_LOADING":
//       const newState = JSON.parse(JSON.stringify(state));
//       newState.isFetching = true;
//       return newState;
//     case "LOCATIONS_FETCH_DATA_SUCCESS":
//       const newState = JSON.parse(JSON.stringify(state));
//       newState.isFetching = false;
//       return newState;
//     default:
//       return state;
//   }
// };

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOCATIONS_FETCH_DATA_SUCCESS":
      return setLocations(state, action);
    default:
      return state;
  }
};

export default reducer;
