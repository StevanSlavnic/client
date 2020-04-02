import * as actionTypes from '../actions/actionTypes'

const setLoggedInUser = (state, payload) => payload.userData

const unsetLoggedInUser = (state, userData) => null

// untill we get the data inital state is null
const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.USER_SET_LOGGED:
      return setLoggedInUser(state, action)
    case actionTypes.USER_UNSET_LOGGED:
      return unsetLoggedInUser(state, action)
    default:
      return state
  }
}

export default reducer
