/* eslint-disable no-undef */
import * as userService from '../../services/user/userService'
import * as actionTypes from './actionTypes'
// eslint-disable-next-line import/no-cycle
import { logout } from './authActions'

export const setLoggedInUser = userData => ({
  type: actionTypes.USER_SET_LOGGED,
  userData
})

export const unsetLoggedUser = () => ({
  type: actionTypes.USER_UNSET_LOGGED
})

// eslint-disable-next-line consistent-return
export const getLoggedUser = () => (dispatch) => {
  const token = localStorage.getItem('token')

  if (!token) {
    // @TODO autorefresh on expire token, added some logic. Remove this comment if this works
    dispatch(logout())
  } else {
    const tokenData = JSON.parse(token)

    const tokenParsed = tokenData.token

    return userService
      .getLoggedUser(tokenParsed)
      .then((response) => {
        console.log(response.data)
        dispatch(setLoggedInUser(response.data))
        return response
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
