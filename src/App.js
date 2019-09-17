import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";
import * as actions from "./store/actions/indexActions";
import {
  getReturnToUrlToken,
  deleteReturnToUrlToken
} from "./utils/redirectTo";
// containers
import * as container from "./containers/indexContainers";
// components
import Layout from "./components/Layout/Layout";

const intervalAutorefresh = fn => setInterval(fn, 20000);

class App extends React.PureComponent {
  componentDidMount() {
    this.props.onTryAutoSignup();

    // listening for route changes
    this.props.history.listen((location, action) => {
      // scrolling to top on routing
      const mainDOMContainer = document.querySelector("#main_scroller");
      if (mainDOMContainer && mainDOMContainer.scrollTo) {
        mainDOMContainer.scrollTo(0, 0);
      }
    });
  }

  updateUserData = () => {
    this.props.updateLoggedUser();
  };

  componentDidUpdate(prevProps) {
    // check URL's if it has 'redirect' flag is comming from an email.
    // if it is and user isn't logged we should redirect him to sign-in
    // and remeber where he came from in the query to redirect him to the proper page after sign-in inside auth component
    const query = new URLSearchParams(this.props.location.search);
    const redirected = query.get("redirect");
    // const anchorHash = query.get('commentId');

    if (
      redirected &&
      !this.props.isAuthenticated &&
      this.props.location.pathname !== "/auth"
    ) {
      this.props.history.push({
        pathname: "/auth",
        search: "?redirect=" + this.props.location.pathname
      });
    }

    // setting interval for logged in user and removing it for public one. @TODO create socket to update with less payload
    if (this.props.loggedUser && !this.userRefreshData) {
      this.userRefreshData = intervalAutorefresh(this.updateUserData);
    } else if (!this.props.loggedUser && this.userRefreshData) {
      clearInterval(this.userRefreshData);
    }

    // return the user to the private URL he wanted to access while he was a public user (before login/signup)
    const returnToTokenUrl = getReturnToUrlToken();
    if (this.props.loggedUser && returnToTokenUrl) {
      deleteReturnToUrlToken();
      setTimeout(() => this.props.history.push(returnToTokenUrl));
    }
  }

  render() {
    const loadingUserData = Boolean(
      this.props.isAuthenticated && !this.props.loggedUser
    );
    const loadingApp = this.props.loadingApp;
    const userIsLogged = Boolean(this.props.loggedUser);

    // public routes
    let publicRoutes = [];

    // exclusively public routes
    if (!userIsLogged) {
      publicRoutes.push(
        {
          path: "/auth",
          exact: true,
          component: container.Auth
        },

        { path: "/auth/confirm", component: container.ConfirmToken },
        { path: "/", exact: true, component: container.Homepage }
      );
    }

    // approved routes
    const loggedUserRoutes = [
      { path: "/admin", component: container.AdminPanel },
      { path: "/logout", component: container.Logout }
    ];

    let routes = [...publicRoutes, ...(userIsLogged ? loggedUserRoutes : [])];

    let redirection = <Redirect to={userIsLogged ? "/admin" : "/"} />;

    const appMarkup = (
      <Layout>
        <Switch>
          {/* List all the routes user is able to access to */}
          {routes.map((route, index) => (
            <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
              key={index}
            />
          ))}

          {/* Redirect if some path is not undefined */}
          {redirection}
        </Switch>
      </Layout>
    );
    return (
      // @TODO h1 loader is just a placeholder
      <React.Fragment>
        {loadingUserData || loadingApp ? (
          <h1 style={{ padding: "20px" }}>Loading...</h1>
        ) : (
          appMarkup
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: Boolean(state.auth.accessToken),
    loggedUser: state.user,
    loadingApp: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    updateLoggedUser: () => dispatch(actions.getLoggedUser())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
