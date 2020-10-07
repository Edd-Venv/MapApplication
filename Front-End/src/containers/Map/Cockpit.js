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
    const { onComponentMount } = this.props;

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onComponentMount(lat, lng);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { state, onPlaceSelected, onMarkerDragEnd } = this.props;

    if (state.isDataLoaded) {
      return (
        <ErrorBoundary data-test="component-error-boundary">
          <Map
            state={state}
            onPlaceSelected={onPlaceSelected}
            onMarkerDragEnd={onMarkerDragEnd}
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
});
Cockpit.propTypes = {
  state: PropTypes.object.isRequired,
  onComponentMount: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cockpit);
