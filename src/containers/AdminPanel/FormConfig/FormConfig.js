import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import _ from 'lodash'
import { Formik, Form } from 'formik'
import { FormikTextField } from 'formik-material-fields'
import * as locationService from '../../../services/location/locationService'
import {
  locationCreating,
  locationEdit
} from '../../../store/actions/locationActions'

import Button from '../../../components/UI/Button/Button'
import classes from './FormConfig.module.scss'

class FormConfig extends Component {
  static propTypes = {
    location: propTypes.object,
    type: propTypes.string,
    onCloseEdit: propTypes.func,
    onClose: propTypes.func,
    createLocation: propTypes.func.isRequired,
    editLocation: propTypes.func.isRequired,
    locationEditId: propTypes.string
  }

  static defaultProps = {
    location: null,
    type: null,
    onCloseEdit: null,
    onClose: null,
    locationEditId: null
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      address: '',
      street_number: '',
      city: '',
      state: '',
      country: '',
      zip_code: ''
    }
  }

  componentDidMount() {
    if (this.props.type === 'edit') {
      setTimeout(() => {
        this.setState({
          title: this.props.location.title,
          description: this.props.location.description,
          address: this.props.location.address,
          street_number: this.props.location.street_number,
          city: this.props.location.city,
          state: this.props.location.state,
          country: this.props.location.country,
          zip_code: this.props.location.zip_code
        })
      }, 500)
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextPropsCopy = nextProps

    this.setState({
      address: _.has(nextPropsCopy.results, 'streetName')
        ? nextPropsCopy.results.streetName.long_name
        : '',
      street_number: _.has(nextPropsCopy.results, 'streetNumber')
        ? nextPropsCopy.results.streetNumber.long_name
        : '',
      city: _.has(nextPropsCopy.results, 'city')
        ? nextPropsCopy.results.city.long_name
        : '',
      state: _.has(nextPropsCopy.results, 'state')
        ? nextPropsCopy.results.state_r.long_name
        : '',
      country: _.has(nextPropsCopy.results, 'country')
        ? nextPropsCopy.results.country.long_name
        : '',
      zip_code: _.has(nextPropsCopy.results, 'zip')
        ? nextPropsCopy.results.zip.long_name
        : ''
    })
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={this.state}
          onSubmit={(values, { setSubmitting }) => {
            if (this.props.type === 'edit') {
              setTimeout(() => {
                locationService
                  .editLocation(this.props.locationEditId, values)
                  .then((response) => {
                    const data = JSON.parse(response.config.data)
                    this.props.editLocation(this.props.locationEditId, data)
                  })
              }, 400)
            } else {
              locationService.createLocation(values).then((response) => {
                const data = response.data
                this.props.createLocation(data)
              })
            }

            const closeModal = () => (this.props.type === 'edit'
              ? this.props.onCloseEdit()
              : this.props.onClose())
            setTimeout(() => {
              setSubmitting(false)
              closeModal()
            }, 400)
          }}
          validate={(values) => {
            const errors = {}
            if (!values.title) {
              errors.title = 'Required'
            }
            if (values.title.length <= 3) {
              errors.title = 'Enter title longer than 3 characters'
            }

            if (values.title.length >= 150) {
              errors.title = 'Title is limited to 150 characters'
            }
            if (!values.description) {
              errors.description = 'Required'
            }

            if (values.description.length <= 3) {
              errors.description = 'Enter description longer than 3 characters'
            }

            if (values.description.length >= 450) {
              errors.description = 'Description is limited to 450 characters'
            }

            if (!values.address) {
              errors.address = 'Required'
            }

            if (values.address.length <= 3) {
              errors.address = 'Enter address longer than 3 characters'
            }

            if (values.address.length >= 150) {
              errors.address = 'Address is limited to 150 characters'
            }

            if (!values.street_number) {
              errors.street_number = 'Required'
            }

            if (values.street_number.length >= 150) {
              errors.street_number = 'Street number is limited to 150 characters'
            }

            if (!values.city) {
              errors.city = 'Required'
            }

            if (values.city.length <= 3) {
              errors.city = 'Enter city name longer than 3 characters'
            }

            if (values.city.length >= 150) {
              errors.city = 'City name is limited to 150 characters'
            }

            if (!values.state) {
              errors.state = 'Required'
            }

            if (values.state.length <= 3) {
              errors.state = 'Enter state name longer than 3 characters'
            }

            if (values.state.length >= 150) {
              errors.state = 'State name is limited to 150 characters'
            }

            if (!values.country) {
              errors.country = 'Required'
            }

            if (values.country.length <= 3) {
              errors.country = 'Enter country name longer than 3 characters'
            }

            if (values.country.length >= 150) {
              errors.country = 'Country name is limited to 150 characters'
            }

            if (!values.zip_code) {
              errors.zip_code = 'Required'
            }

            if (values.zip_code.length >= 150) {
              errors.zip_code = 'Zip code is limited to 150 characters'
            }

            return errors
          }}
          render={({ isSubmitting }) => (this.props.type === 'edit' ? (
            <Form>
              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='title'
                  label='Title'
                  value={this.state.title}
                  onChange={e => this.handleChange(e, 'title')}
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='description'
                  label='Description'
                  value={this.state.description}
                  onChange={e => this.handleChange(e, 'description')}
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='address'
                  label='Address'
                  value={this.state.address}
                  onChange={e => this.handleChange(e, 'address')}
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='street_number'
                  label='Street number'
                  value={this.state.street_number}
                  onChange={e => this.handleChange(e, 'street_number')}
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='city'
                  label='City'
                  value={this.state.city}
                  onChange={e => this.handleChange(e, 'city')}
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='state'
                  label='State'
                  value={this.state.state}
                  onChange={e => this.handleChange(e, 'state')}
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='country'
                  label='Country'
                  value={this.state.country}
                  onChange={e => this.handleChange(e, 'country')}
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='zip_code'
                  label='Zip Code'
                  value={this.state.zip_code}
                  onChange={e => this.handleChange(e, 'zip_code')}
                  className={classes.FormConfigField}
                />
              </div>
              <div className={classes.FormConfigButton}>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          ) : (
            <Form>
              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='title'
                  label='Title'
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='description'
                  label='Desctiption'
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='address'
                  label='Address'
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='street_number'
                  label='Street Number'
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='city'
                  label='City'
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='state'
                  label='State'
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigGroup}>
                <FormikTextField
                  type='text'
                  name='country'
                  label='Country'
                  className={classes.FormConfigField}
                />

                <FormikTextField
                  type='text'
                  name='zip_code'
                  label='Zip Code'
                  className={classes.FormConfigField}
                />
              </div>

              <div className={classes.FormConfigButton}>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          ))
          }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  isLoading: state.locationsAreLoading
})

const mapDispatchToProps = dispatch => ({
  createLocation: location => dispatch(locationCreating(location)),
  editLocation: (id, location) => dispatch(locationEdit(id, location))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormConfig)
