import React from 'react'
import {
  Route, Switch, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './store/actions/indexActions'
import * as container from './containers/indexContainers'

import Layout from './components/Layout/Layout'
import './App.scss'

class App extends React.PureComponent {
  componentDidMount() {
    this.props.onTryAutoSignup()

    // listening for route changes
    this.props.history.listen((location, action) => {
      // scrolling to top on routing
      // eslint-disable-next-line no-undef
      const mainDOMContainer = document.querySelector('#main_scroller')
      if (mainDOMContainer && mainDOMContainer.scrollTo) {
        mainDOMContainer.scrollTo(0, 0)
      }
    })
  }

  componentDidUpdate(prevProps) {
    // check URL's if it has 'redirect' flag is comming from an email.
    // if it is and user isn't logged we should redirect him to sign-in
    // and remeber where he came from in the query to redirect him to the proper
    // page after sign-in inside auth component
    const query = new URLSearchParams(this.props.location.search)
    const redirected = query.get('redirect')

    if (
      redirected
      && !this.props.isAuthenticated
      && this.props.location.pathname !== '/auth'
    ) {
      this.props.history.push({
        pathname: '/auth',
        search: `?redirect=${this.props.location.pathname}`
      })
    }
  }

  updateUserData = () => {
    this.props.updateLoggedUser()
  }

  render() {
    const loadingUserData = Boolean(
      this.props.isAuthenticated && !this.props.loggedUser
    )
    const loadingApp = this.props.loadingApp
    const userIsLogged = Boolean(this.props.loggedUser)

    // public routes
    const publicRoutes = []

    // exclusively public routes
    if (!userIsLogged) {
      publicRoutes.push(
        { path: '/register', component: container.SignUp },
        {
          path: '/auth',
          exact: true,
          component: container.Auth
        },

        { path: '/', exact: true, component: container.Homepage }
      )
    }

    // approved routes
    const loggedUserRoutes = [
      { path: '/', exact: true, component: container.Homepage },
      { path: '/admin', component: container.AdminPanel },
      { path: '/logout', component: container.Logout }
    ]

    const routes = [...publicRoutes, ...(userIsLogged ? loggedUserRoutes : [])]

    const redirection = <Redirect to={userIsLogged ? '/admin' : '/'} />

    const appMarkup = (
      <Layout>
        <Switch>
          {/* List all the routes user is able to access to */}
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}

          {/* Redirect if some path is not undefined */}
          {redirection}
        </Switch>
      </Layout>
    )

    return (
      // @TODO h1 loader is just a placeholder
      <React.Fragment>
        {loadingUserData || loadingApp ? (
          <h1 style={{ padding: '20px' }}>Loading...</h1>
        ) : (
          appMarkup
        )}
      </React.Fragment>
    )
  }
}

App.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateLoggedUser: PropTypes.func.isRequired,
  loggedUser: PropTypes.any,
  loadingApp: PropTypes.bool.isRequired
}

App.defaultProps = {
  loggedUser: null
}

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.auth.accessToken),
  loggedUser: state.user,
  loadingApp: state.auth.loading
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  updateLoggedUser: () => dispatch(actions.getLoggedUser())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
