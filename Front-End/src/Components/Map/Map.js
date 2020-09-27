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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.onComponentMount(lat, lng);
      });
    }
  }

  onComponentMount = (lat, lng) => {
    const promise = handleComponentMount(lat, lng);
    promise.then((response) => {
      const newState = Object.assign({}, this.state, response);

      this.setState(newState);
    });
  };

  onMarkerDragEnd = (event) => {
    const promise = handleMarkerDragEnd(event);
    promise.then((response) => {
      const newState = Object.assign({}, this.state, response);

      this.setState(newState);
    });
  };

  onPlaceSelected = (place) => {
    const data = handlePlaceSelected(place);
    const newState = Object.assign({}, this.state, data);

    this.setState(newState);
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
            data-test="component-marker"
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            <InfoWindow>
              <div>{this.state.address}</div>
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
      <Map
        data-test="component-map"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
