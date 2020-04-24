/* eslint-disable no-undef */
import * as actionTypes from './actionTypes'
import * as authService from '../../services/auth/authService'
// eslint-disable-next-line import/no-cycle
import * as userActions from './userActions'

// here are action creators. Dispatch parameter is provided via thunk
// (library for handling async action creating)

const authStart = () => ({
  type: actionTypes.AUTH_START
})

const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
})

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
})

const logoutUser = () => {
  localStorage.removeItem('token')
  console.log('Logging out!')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const logout = () => (dispatch) => {
  dispatch(logoutUser())
  dispatch(userActions.unsetLoggedUser())
}

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart())

  const loginData = { email, password }

  // returning the promise to handle getLoggedUser 'onsuccess'
  // routing and error where function is called
  return new Promise((resolve, reject) => {
    authService
      .login(loginData)
      .then((response) => {
        // set token in local storage
        const authData = {
          ...response.data
        }

        localStorage.setItem('token', JSON.stringify(authData))

        dispatch(authSuccess(response.data))

        // get user data via token
        dispatch(userActions.getLoggedUser())
          .then((data) => {
            // resolve the main promise when user is fetched
            console.log('Get logged user response', data)
            resolve(data)
          })
          .catch((err) => {
            // reject the main promise if user couldnt be fetched using the token
            reject(err)
          })
      })
      .catch((err) => {
        console.log(err)
        // reject the main promise if user email or password are incorect
        reject(err)
        dispatch(authFail(err))
      })
  })
}

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) {
    dispatch(logout())
  } else {
    const authData = JSON.parse(token)
    console.log(authData)

    dispatch(authSuccess(authData))
    dispatch(userActions.getLoggedUser())
  }
}

export const authUsingToken = (authTokenData, userData) => (dispatch) => {
  const authData = {
    ...authTokenData
  }
  localStorage.setItem('token', JSON.stringify(authData))
  dispatch(authSuccess(authTokenData))
  dispatch(userActions.setLoggedInUser(userData))
}
