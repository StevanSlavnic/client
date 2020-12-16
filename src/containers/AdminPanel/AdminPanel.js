import React, { Component } from "react";
import { connect } from "react-redux";
import {
  locationsFetchData,
  locationRemove
  // locationEdit
} from "../../store/actions/locationActions";
import * as locationService from "../../services/location/locationService";

import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import FormConfig from "./FormConfig/FormConfig";
import GooglePlaces from "./GooglePlaces/GooglePlaces";
import Location from "../../components/Location/Location";
import classes from "../AdminPanel/AdminPanel.module.scss";

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
      location: "",
      locations: ""
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

    this.setState({
      locationEditId: id
    });

    setTimeout(() => {
      locationService
        .getLocation(this.state.locationEditId)
        .then(response => {
          this.setState({ location: response.data });
        })
        .catch(error => {
          console.log(error.data);
        });
    }, 400);
  };

  closeDeleteModal = () => {
    this.setState({ modalDeleteOpened: false });
  };

  openDeleteModal = id => {
    this.setState({ modalDeleteOpened: true });
    this.getLocationId(id);

    this.setState({
      locationId: id
    });
  };

  callbackFunction = childData => {
    this.setState({ results: childData });
  };

  getLocationId(id) {
    const locationId = id;

    return locationId;
  }

  getLocationEditId(id) {
    const locationEditId = id;

    return locationEditId;
  }

  handleLocationDelete() {
    locationService.deleteLocation(this.state.locationId);
    this.props.removeLocation(this.state.locationId);
    this.setState({
      modalDeleteOpened: false
    });
  }

  render() {
    const {
      locations: { locations }
    } = this.props;

    const location = this.state.location;

    const locationsRender =
      locations &&
      locations.map(location => {
        return (
          <div key={location.id}>
            <Location
              id={location.id}
              location={location}
              locationId={() => this.getLocationId(location.id)}
              locationEditId={() => this.getLocationEditId(location.id)}
              openEditModal={this.openEditModal}
              openDeleteModal={this.openDeleteModal}
              locationEditAction={""}
              className={classes.LocationAdminPanelCard}
            />
          </div>
        );
      });

    return (
      <div className={classes.AdminPanelPageWrap}>
        <div className={classes.AdminPanelHeader}>
          <h1>Admin panel</h1>
          <Button onClick={this.openModal}>Add Location</Button>
        </div>
        <Modal
          open={this.state.modalOpened}
          onClose={this.closeModal}
          className={classes.AdminPanelModalWide}
        >
          <GooglePlaces
            parentCallback={this.callbackFunction}
            className={classes.AdminPanelGoogleAutocomplete}
          />
          <FormConfig results={this.state.results} onClose={this.closeModal} />
        </Modal>

        <div className={classes.LocationsAdminPanelWrap}>
          <div>{locationsRender}</div>
        </div>

        <Modal
          open={this.state.modalEditOpened}
          onClose={this.closeEditModal}
          className={classes.AdminPanelModalWide}
        >
          <GooglePlaces
            parentCallback={this.callbackFunction}
            className={classes.AdminPanelGoogleAutocomplete}
          />
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
          className={classes.AdminPanelDialogModal}
        >
          <div>Are you shure you want to delete this Location?</div>
          <div>
            <Button
              className={classes.AdminPanelButton}
              onClick={() => this.handleLocationDelete()}
            >
              Delete
            </Button>{" "}
            <Button
              className={classes.AdminPanelButton}
              onClick={this.closeDeleteModal}
            >
              Cancel
            </Button>
          </div>
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
    removeLocation: id => dispatch(locationRemove(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
