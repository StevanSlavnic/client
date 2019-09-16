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

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authRefreshToken());
    }, expirationTime * 1000);
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
            ...response.data,
            expires_date: new Date(
              new Date().getTime() + response.data["expires_in"] * 1000
            )
          };

          console.log(authData.token);

          localStorage.setItem("token", JSON.stringify(authData.token));
          dispatch(authSuccess(authData));

          // get user data via token
          dispatch(userActions.getLoggedUser(authData.token))
            .then(response => {
              // resolve the main promise when user is fetched
              console.log("Get logged user response", response);
              resolve(response);
            })
            .catch(err => {
              // reject the main promise if user couldnt be fetched using the token
              reject(err);
            });

          // set token timeout autorefresh
          dispatch(checkAuthTimeout(response.data["expires_in"]));
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
      const expirationDate = new Date(authData["expires_date"]);
      if (expirationDate <= new Date()) {
        dispatch(authRefreshToken("autologin"));
      } else {
        dispatch(authSuccess(authData));
        dispatch(userActions.getLoggedUser());
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const authRefreshToken = autologin => {
  return dispatch => {
    if (localStorage.getItem("token") === null) return;
    const authData = JSON.parse(localStorage.getItem("token"));

    authService
      .refreshToken({
        refresh_token: authData["refresh_token"]
      })
      .then(response => {
        const authData = {
          ...response.data,
          expires_date: new Date(
            new Date().getTime() + response.data["expires_in"] * 1000
          )
        };

        localStorage.setItem("token", JSON.stringify(authData));
        dispatch(authSuccess(response.data));
        //if there is autologin flag log the user, if there is no flag it's just a interval refreshing the token and there is no need to check
        if (autologin) {
          dispatch(userActions.getLoggedUser());
        }
        dispatch(checkAuthTimeout(response.data["expires_in"]));
      })
      .catch(err => {
        console.log("Error while refreshing token", err);
        dispatch(logout());
      });
  };
};

export const authUsingToken = (authTokenData, userData) => {
  return dispatch => {
    const authData = {
      ...authTokenData,
      expires_date: new Date(
        new Date().getTime() + authTokenData["expires_in"] * 1000
      )
    };
    localStorage.setItem("token", JSON.stringify(authData));
    dispatch(authSuccess(authTokenData));
    dispatch(userActions.setLoggedInUser(userData));
    dispatch(checkAuthTimeout(authTokenData["expires_in"]));
  };
};
