import {
  handleComponentMount,
  handleMarkerDragEnd,
  handlePlaceSelected,
} from "./Utils";
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Map from "./Map";

class Cockpit extends React.Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };

  componentDidMount() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.onComponentMount(lat, lng);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onComponentMount = (lat, lng) => {
    try {
      const promise = handleComponentMount(lat, lng);
      promise.then((response) => {
        const newState = Object.assign({}, this.state, response);

        this.setState(newState);
      });
    } catch (error) {
      console.log(error);
    }
  };

  onMarkerDragEnd = (event) => {
    try {
      const promise = handleMarkerDragEnd(event);
      promise.then((response) => {
        const newState = Object.assign({}, this.state, response);

        this.setState(newState);
      });
    } catch (error) {
      console.log(error);
    }
  };

  onPlaceSelected = (place) => {
    try {
      const data = handlePlaceSelected(place);
      const newState = Object.assign({}, this.state, data);

      this.setState(newState);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ErrorBoundary data-test="component-error-boundary">
        <Map
          state={this.state}
          onPlaceSelected={this.onPlaceSelected}
          onMarkerDragEnd={this.onMarkerDragEnd}
        />
      </ErrorBoundary>
    );
  }
}

export default Cockpit;
