import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/indexActions'

import Logo from '../../../logo.svg'
import classes from './Header.module.scss'

class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
    user: null
  }

  render() {
    return (
      <div className={classes.Header}>
        <div className={classes.LogoPlace}>
          <div>
            <img className={classes.AppLogo} src={Logo} alt='Logo' />
          </div>
          <div>
            <Link to='/'>
              <div>FindYourService</div>
            </Link>
          </div>
        </div>
        <div>
          <nav className={classes.Nav}>
            {this.props.user ? (
              <div>
                <Link to='/admin' className={classes.Link}>
                  Admin
                </Link>
                <Link to='/logout' className={classes.Link}>
                  Logout
                </Link>
              </div>
            ) : (
              <div>
                <Link to='/register' className={classes.Link}>
                  Register
                </Link>
                <Link to='/auth' className={classes.Link}>
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.auth.accessToken
})

const mapDispatchToProps = dispatch => ({
  updateLoggedUser: () => dispatch(actions.getLoggedUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
