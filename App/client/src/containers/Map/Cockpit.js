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
    const { onComponentMount, state } = this.props;

    try {
      if (navigator.geolocation && state.getUserLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            onComponentMount(lat, lng);
          },
          (error) => {
            throw new Error(error);
          },
          { enableHighAccuracy: true }
        );
      }
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
    } = this.props;

    if (state.isDataLoaded) {
      return (
        <ErrorBoundary data-test="component-error-boundary">
          <Map
            state={state}
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
  onComponentMount: (lat, lng) => {
    dispatch(actionCreators.getUserInfo({ lat, lng }));
  },
  onPlaceSelected: (place) => {
    dispatch(actionCreators.getPlaceSelected(place));
  },
  onMarkerDragEnd: (event) => {
    dispatch(actionCreators.getMarkerEndDrag(event));
  },
  onSaveLocation: (state) => {
    dispatch(actionCreators.saveMylocations(state));
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
  onComponentMount: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
  onSaveLocation: PropTypes.func.isRequired,
  onShowUserInfoWindow: PropTypes.func.isRequired,
  onCloseUserInfoWindow: PropTypes.func.isRequired,
  onSelectedMarkerInfoWindow: PropTypes.func.isRequired,
  onCloseSelectedMarkerInfoWindow: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cockpit);
