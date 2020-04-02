import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import Card from '../UI/Card/Card'
import classes from './Location.module.scss'

const Location = props => (
  <Card
    className={[classes.Card, props.className].join(' ')}
    key={props.location.id}
  >
    {!props.isAdmin && (
      <div className={classes.LocationGeneral}>
        <div>
          <span className={classes.LocationLabel}>ID: </span>
          {props.location.id}
        </div>
        <div>
          <Button
            onClick={() => {
              props.openEditModal(props.location.id)
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              props.openDeleteModal(props.location.id)
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    )}
    <div>
      <div>
        <h2>{props.location.title}</h2>
      </div>
      <div>
        <p>{props.location.description}</p>
      </div>
    </div>
    <div>
      <div>
        <span className={classes.LocationLabel}>Address: </span>
        {props.location.address}
      </div>
      <div>
        <span className={classes.LocationLabel}>City: </span>
        {props.location.city}
      </div>
      <div>
        <span className={classes.LocationLabel}>State: </span>
        {props.location.state}
      </div>
      <div>
        <span className={classes.LocationLabel}>Zip Code: </span>
        {props.location.zip_code}
      </div>
    </div>
  </Card>
)

Location.propTypes = {
  location: PropTypes.object.isRequired,
  openDeleteModal: PropTypes.func,
  openEditModal: PropTypes.func,
  isAdmin: PropTypes.string,
  className: PropTypes.string
}

Location.defaultProps = {
  openDeleteModal: null,
  openEditModal: null,
  isAdmin: null,
  className: null
}

export default Location
