import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../../store/actions/indexActions'

class Logout extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return <Redirect to='/' />
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
})

export default connect(null, mapDispatchToProps)(Logout)
