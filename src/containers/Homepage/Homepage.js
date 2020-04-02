import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { FormikTextField } from 'formik-material-fields'
import IconButton from '@material-ui/core/IconButton'
import {
  locationsFetchData,
  locationsFetchDataFiltered
} from '../../store/actions/locationActions'
import * as locationService from '../../services/location/locationService'

import Location from '../../components/Location/Location'
import Button from '../../components/UI/Button/Button'
import Reset from '../../assets/images/icons/close_icon.svg'
import classes from './Homepage.module.scss'

class HomePage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
    match: PropTypes.object,
    fetchDataFiltered: PropTypes.func.isRequired
  }

  static defaultProps = {
    match: null
  }

  componentDidMount() {
    this.props.fetchData('http://127.0.0.1:8093/api/v1/locations')
  }

  handleReset() {
    this.props.fetchData('http://127.0.0.1:8093/api/v1/locations')
  }

  render() {
    const {
      locations: { locations }
    } = this.props

    console.log(this.props.locations)

    const locationsRender = locations
        && locations.map(location => (
          <div className={classes.LocationHomeColumn} key={location.id}>
            <Location
              className={classes.LocationHomeCard}
              isAdmin={this.props.match.url}
              id={location.id}
              location={location}
            />
          </div>
        ))

    return (
      <div className={classes.HomePageWrap}>
        <h1>Search places</h1>
        <div className={classes.FormWrap}>
          <Formik
            initialValues={{ keyword: '', city: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false)
                locationService
                  .getAllLocations(values.keyword, values.city)
                  .then((response) => {
                    const results = response.data
                    console.log(values)
                    this.props.fetchDataFiltered(results)
                  })
              }, 600)
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <FormikTextField
                  type='text'
                  name='keyword'
                  placeholder='Search by any word'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyword}
                  className={classes.HomePageFormField}
                />

                <FormikTextField
                  type='text'
                  name='city'
                  placeholder='Search by city'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  className={classes.HomePageFormField}
                />

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className={classes.HomePageFormButton}
                >
                  Submit
                </Button>

                {values.keyword || values.city ? (
                  <IconButton
                    className={classes.HomePageResetButton}
                    onClick={() => {
                      resetForm()
                      this.handleReset()
                    }}
                  >
                    <img className={classes.Icon} src={Reset} alt='X mark' />
                  </IconButton>
                ) : (
                  ''
                )}
              </form>
            )}
          </Formik>
        </div>
        <div className={classes.LocationsHomeWrap}>
          <div className={classes.LocationsHomeRow}>{locationsRender}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  locationsFiltered: state.locationsFiltered,
  loggedUser: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(locationsFetchData(url)),
  fetchDataFiltered: locations => dispatch(locationsFetchDataFiltered(locations))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
