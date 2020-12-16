import * as actionTypes from "./actionTypes";
import * as authService from "../../services/auth/authService";
import * as userActions from "./../actions/userActions";

// here are action creators. Dispatch parameter is provided via thunk (library for handling async action creating)

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

const _logout = () => {
  localStorage.removeItem("token");
  console.log("Logging out!");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(_logout());
    dispatch(userActions.unsetLoggedUser());
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const loginData = { email: email, password };

    // returning the promise to handle getLoggedUser 'onsuccess' routing and error where function is called
    return new Promise((resolve, reject) => {
      authService
        .login(loginData)
        .then(response => {
          // set token in local storage
          const authData = {
            ...response.data
          };

          localStorage.setItem("token", JSON.stringify(authData));

          dispatch(authSuccess(response.data));

          // get user data via token
          dispatch(userActions.getLoggedUser())
            .then(response => {
              // resolve the main promise when user is fetched
              console.log("Get logged user response", response);
              resolve(response);
            })
            .catch(err => {
              // reject the main promise if user couldnt be fetched using the token
              reject(err);
            });
        })
        .catch(err => {
          console.log(err);
          // reject the main promise if user email or password are incorect
          reject(err);
          dispatch(authFail(err));
        });
    });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const authData = JSON.parse(token);
      console.log(authData);

      dispatch(authSuccess(authData));
      dispatch(userActions.getLoggedUser());
    }
  };
};

export const authUsingToken = (authTokenData, userData) => {
  return dispatch => {
    const authData = {
      ...authTokenData
    };
    localStorage.setItem("token", JSON.stringify(authData));
    dispatch(authSuccess(authTokenData));
    dispatch(userActions.setLoggedInUser(userData));
  };
};
