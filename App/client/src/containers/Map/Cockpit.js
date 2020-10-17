import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/cockpit";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Map from "./Map";
import Spinner from "../../components/UI/Spinner/Spinner";

class Cockpit extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const {
      onComponentMountGetUserInfo,
      onComponentMountFetchLocations,
      state,
    } = this.props;

    try {
      if (navigator.geolocation && state.getUserLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            onComponentMountGetUserInfo(lat, lng);
          },
          (error) => {
            throw new Error(error);
          },
          { enableHighAccuracy: true }
        );
      }
      const userID = "5f887d2d40126b396c0a5492";
      onComponentMountFetchLocations(userID);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      state,
      onPlaceSelected,
      onMarkerDragEnd,
      onSaveLocation,
      onShowUserInfoWindow,
      onSelectedMarkerInfoWindow,
      onCloseUserInfoWindow,
      onCloseSelectedMarkerInfoWindow,
      onDeleteSavedLocation,
    } = this.props;

    if (state.isDataLoaded) {
      return (
        <ErrorBoundary data-test="component-error-boundary">
          <Map
            state={state}
            onDeleteSavedLocation={onDeleteSavedLocation}
            onPlaceSelected={onPlaceSelected}
            onMarkerDragEnd={onMarkerDragEnd}
            onSaveLocation={onSaveLocation}
            onShowUserInfoWindow={onShowUserInfoWindow}
            onSelectedMarkerInfoWindow={onSelectedMarkerInfoWindow}
            onCloseUserInfoWindow={onCloseUserInfoWindow}
            onCloseSelectedMarkerInfoWindow={onCloseSelectedMarkerInfoWindow}
          />
        </ErrorBoundary>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  state: state.cockpit,
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMountGetUserInfo: (lat, lng) => {
    dispatch(actionCreators.getUserInfo({ lat, lng }));
  },
  onComponentMountFetchLocations: (userData) => {
    dispatch(actionCreators.getMyLocations(userData));
  },
  onDeleteSavedLocation: (id) => {
    dispatch(actionCreators.deleteSelectedLocation(id));
  },
  onPlaceSelected: (place) => {
    dispatch(actionCreators.getPlaceSelected(place));
  },
  onMarkerDragEnd: (event) => {
    dispatch(actionCreators.getMarkerEndDrag(event));
  },
  onSaveLocation: (state) => {
    dispatch(actionCreators.saveMyLocation(state));
  },
  onShowUserInfoWindow: () => {
    dispatch(actionCreators.usersLocationInfoWindow());
  },
  onCloseUserInfoWindow: () => {
    dispatch(actionCreators.closeUsersLocationInfoWindow());
  },
  onSelectedMarkerInfoWindow: (location) => {
    dispatch(actionCreators.selectedMarkerInfoWindow(location));
  },
  onCloseSelectedMarkerInfoWindow: () => {
    dispatch(actionCreators.closeSelectedMarkerInfoWindow());
  },
});
Cockpit.propTypes = {
  state: PropTypes.object.isRequired,
  onDeleteSavedLocation: PropTypes.func.isRequired,
  onComponentMountGetUserInfo: PropTypes.func.isRequired,
  onComponentMountFetchLocations: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
  onSaveLocation: PropTypes.func.isRequired,
  onShowUserInfoWindow: PropTypes.func.isRequired,
  onCloseUserInfoWindow: PropTypes.func.isRequired,
  onSelectedMarkerInfoWindow: PropTypes.func.isRequired,
  onCloseSelectedMarkerInfoWindow: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cockpit);
