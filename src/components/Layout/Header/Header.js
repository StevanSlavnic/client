import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/indexActions";

import classes from "../Header/Header.module.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={classes.Header}>
        <div>
          <Link to="/">FindYourService.com</Link>
        </div>
        <div>
          <nav className={classes.Nav}>
            {this.props.user ? (
              <div>
                <Link to="/admin" className={classes.Link}>
                  Admin
                </Link>
                <Link to="/logout" className={classes.Link}>
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/auth" className={classes.Link}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLoggedUser: () => dispatch(actions.getLoggedUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
