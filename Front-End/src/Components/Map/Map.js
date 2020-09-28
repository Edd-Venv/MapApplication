import {
  InfoWindow,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import {
  handleComponentMount,
  handleMarkerDragEnd,
  handlePlaceSelected,
} from "./Utils";
import AutoComplete from "react-google-autocomplete";
import React from "react";
import SaveButton from "../SaveButton/SaveButton";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Map extends React.Component {
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
    const Map = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            <InfoWindow>
              <SaveButton state={this.state} />
            </InfoWindow>
          </Marker>
          <AutoComplete
            types={["(regions)"]}
            onPlaceSelected={this.onPlaceSelected}
          />
        </GoogleMap>
      ))
    );
    return (
      <ErrorBoundary data-test="component-error-boundary">
        <Map
          data-test="component-map"
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </ErrorBoundary>
    );
  }
}

export default Map;
