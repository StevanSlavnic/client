import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'
import { Input } from '@material-ui/core'
import apiConf from '../../../utils/apiConfig'

import classes from './GooglePlaces.module.scss'

const MY_API_KEY = apiConf.MAP_APY_KEY

class GoogleSuggest extends Component {
  static propTypes = {
    parentCallback: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      value: '',
      result: {}
    }
  }

  handleInputChange = (e) => {
    this.setState({ search: e.target.value, value: e.target.value })
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState({
      search: '',
      value: geocodedPrediction.formatted_address,
      result: geocodedPrediction
    })
    if (geocodedPrediction) {
      this.sendData()
      this.placeToAddress()
    }
  };

  placeToAddress = () => {
    const address = {}

    this.state.result.address_components.forEach((c) => {
      switch (c.types[0]) {
        case 'street_number':
          address.streetNumber = c
          break
        case 'route':
          address.streetName = c
          break
        case 'locality': // North Hollywood or Los Angeles?
          address.city = c
          break
        case 'postal_code':
          address.zip = c
          break
        case 'administrative_area_level_1': //  Note some countries don't have states
          address.administrativeArea = c
          break
        case 'state_r':
          address.state = c
          break
        case 'country':
          address.country = c
          break
        default:
          break
      }
    })
    return address
  };

  handleNoResult = () => {
    console.log('No results for ', this.state.search)
  };

  handleStatusUpdate = (status) => {
    console.log('status', status)
  };

  sendData = () => {
    const result = this.placeToAddress()
    this.props.parentCallback(result)
  };

  render() {
    const { search, value } = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: 'places,geocode'
        }}
        render={googleMaps => googleMaps && (
        <ReactGooglePlacesSuggest
          googleMaps={googleMaps}
          autocompletionRequest={{
            input: search
          }}
          onNoResult={this.handleNoResult}
          onSelectSuggest={this.handleSelectSuggest}
          onStatusUpdate={this.handleStatusUpdate}
          textNoResults='No results'
          customRender={prediction => (
            <div className='customWrapper'>
              {prediction ? prediction.description : 'No results'}
            </div>
          )}
        >
          <Input
            type='text'
            value={value}
            placeholder='Search place using Google Places service'
            onChange={this.handleInputChange}
            className={classes.GooglePlacesAutoComplete}
          />
        </ReactGooglePlacesSuggest>
        )
        }
      />
    )
  }
}
export default GoogleSuggest
