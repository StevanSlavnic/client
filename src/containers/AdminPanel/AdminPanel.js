import React, { Component } from "react";
import { connect } from "react-redux";
import {
  locationsFetchData,
  locationDelete
} from "../../store/actions/locationActions";
import * as locationService from "../../services/location/locationService";

import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import FormConfig from "./FormConfig/FormConfig";
import GooglePlaces from "./GooglePlaces/GooglePlaces";
import Location from "../../components/Location/Location";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      modalDeleteOpened: false,
      modalEditOpened: false,
      results: "",
      locationId: "",
      locationEditId: "",
      location: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchData("http://127.0.0.1:8093/api/v1/locations");
  }

  closeModal = () => {
    this.setState({ modalOpened: false });
  };

  openModal = () => {
    this.setState({ modalOpened: true });
  };

  closeEditModal = () => {
    this.setState({ modalEditOpened: false });
  };

  openEditModal = id => {
    this.setState({ modalEditOpened: true });

    this.getLocationEditId(id);
    console.log(id);

    this.setState({
      locationEditId: id
    });

    setTimeout(() => {
      locationService
        .getLocation(this.state.locationEditId)
        .then(response => {
          console.log(response.data);
          this.setState({ location: response.data });
        })
        .catch(error => {
          console.log(error.data);
        });
      console.log(this.state.location);
    }, 400);
  };

  closeDeleteModal = () => {
    this.setState({ modalDeleteOpened: false });
  };

  openDeleteModal = id => {
    this.setState({ modalDeleteOpened: true });
    this.getLocationId(id);
    console.log(id);

    this.setState({
      locationId: id
    });
  };

  callbackFunction = childData => {
    this.setState({ results: childData });
  };

  getLocationId(id) {
    const locationId = id;
    console.log(locationId);
    return locationId;
  }

  getLocationEditId(id) {
    const locationEditId = id;
    console.log(locationEditId);
    return locationEditId;
  }

  handleLocationDelete() {
    locationService.deleteLocation(this.state.locationId);
    this.setState({
      modalDeleteOpened: false
    });
    this.props.locationDelete(this.state.locationId);
  }

  render() {
    const locations = this.props.locations.locations
      ? this.props.locations.locations
      : [];

    const location = this.state.location;

    const locationsRender = locations.map(location => {
      return (
        <div key={location.id}>
          <Location
            id={location.id}
            location={location}
            locationId={() => this.getLocationId(location.id)}
            locationEditId={() => this.getLocationEditId(location.id)}
            openEditModal={this.openEditModal}
            openDeleteModal={this.openDeleteModal}
          ></Location>
        </div>
      );
    });

    return (
      <div>
        <h1>Admin panel</h1>
        <Button onClick={this.openModal}>Add Location</Button>
        <Modal open={this.state.modalOpened} onClose={this.closeModal}>
          <GooglePlaces parentCallback={this.callbackFunction} />
          <FormConfig results={this.state.results} onClose={this.closeModal} />
        </Modal>

        <div>{!this.props.locations ? "No locations" : locationsRender}</div>

        <Modal open={this.state.modalEditOpened} onClose={this.closeEditModal}>
          <GooglePlaces parentCallback={this.callbackFunction} />
          <FormConfig
            results={this.state.results}
            locationEditId={this.state.locationEditId}
            location={location}
            type="edit"
            onCloseEdit={this.closeEditModal}
          />
        </Modal>

        <Modal
          open={this.state.modalDeleteOpened}
          onClose={this.closeDeleteModal}
        >
          Are you shure you want to delete this Location?
          <Button onClick={() => this.handleLocationDelete()}>
            Delete
          </Button>{" "}
          <Button onClick={this.closeDeleteModal}>Cancel</Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    isLoading: state.locationsAreLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(locationsFetchData(url)),
    locationDelete: index => dispatch(locationDelete(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
