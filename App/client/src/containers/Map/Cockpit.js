import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/cockpit";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Map from "./Map";
import Spinner from "../../components/UI/Spinner/Spinner";

class Cockpit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidMount() {
    const {
      onComponentMountGetUserInfo,
      onComponentMountFetchLocations,
      state,
    } = this.props;

    try {
      if (navigator.geolocation && state.cockpit.getUserLocation) {
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
      const authorized = state.auth.authenticated;

      if (!authorized) {
        this.setState((prevState) => {
          return {
            error: true,
          };
        });
      }

      if (authorized && localStorage.getItem("token")) {
        const userId = localStorage.getItem("_id");
        onComponentMountFetchLocations(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    console.log("map", this.props.state, nextProps.state);
    //if (this.state === nextState) return false;
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("map", this.state, prevState, prevProps);
  }*/

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

    if (state.cockpit.isDataLoaded) {
      console.log("REndered");
      return (
        <ErrorBoundary data-test="component-error-boundary">
          <Map
            authError={this.state.error}
            state={state.cockpit}
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
  state: state,
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

/*

   const isAuth = isAuthorized(
        "http://localhost:4030/saved/locations",
        "GET"
      );
      isAuth.then((res) => {
        const { authorized, error } = res;
        if (!authorized) {
          localStorage.removeItem("token");
          localStorage.removeItem("_id");
          localStorage.removeItem("username");

          this.setState((prevState) => {
            return {
              error: true,
              errorStatus: error.statusCode,
              errorMessage: error.message,
            };
          });
        } else {
          const userId = localStorage.getItem("_id");
          onComponentMountFetchLocations(userId);
        }
      });

*/
