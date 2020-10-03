import {
  handleComponentMount,
  handleMarkerDragEnd,
  handlePlaceSelected,
} from "./Utils";
import React from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Map from "./Map";
import Spinner from "../../components/UI/Spinner/Spinner";

class Cockpit extends React.Component {
  constructor(props) {
    super();
    this.state = {
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
      showBackDrop: false,
      isDataLoaded: false,
    };
  }

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
      // I Can Set State here(componentDidMount) Because it is a Promise

      const promise = handleComponentMount(lat, lng);
      promise.then((response) => {
        this.setState((prevState, props) => {
          const newState = Object.assign({}, prevState, response);
          newState.isDataLoaded = true;
          return newState;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  onMarkerDragEnd = (event) => {
    try {
      const promise = handleMarkerDragEnd(event);
      promise.then((response) => {
        this.setState((prevState, props) => {
          const newState = Object.assign({}, prevState, response);
          return newState;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  onPlaceSelected = (place) => {
    try {
      const data = handlePlaceSelected(place);
      this.setState((prevState, props) => {
        const newState = Object.assign({}, prevState, data);
        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isDataLoaded)
      return (
        <ErrorBoundary data-test="component-error-boundary">
          <Map
            state={this.state}
            onPlaceSelected={this.onPlaceSelected}
            onMarkerDragEnd={this.onMarkerDragEnd}
          />
        </ErrorBoundary>
      );
    else return <Spinner />;
  }
}

export default Cockpit;
