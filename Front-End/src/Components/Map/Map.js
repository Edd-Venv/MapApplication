import {
  InfoWindow,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { handleAddressComponent, handleMarkerDragEnd } from "./Utils";
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
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {}
        );
      });
    }
  }

  onMarkerDragEnd = (event) => {
    const promise = handleMarkerDragEnd(event);
    promise.then((response) => {
      const newState = Object.assign({}, this.state, response);

      this.setState(newState);
    });
  };
  onPlaceSelected = (place) => {
    const addressArray = place.address_components;
    const address = place.formatted_address;
    const city = handleAddressComponent(addressArray);
    const area = handleAddressComponent(addressArray);
    const state = handleAddressComponent(addressArray);
    const newLat = place.geometry.location.lat();
    const newLng = place.geometry.location.lng();
    const data = {
      address,
      city,
      area,
      state,
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
      mapPosition: {
        lat: newLat,
        lng: newLng,
      },
    };
    const newState = Object.assign({}, this.state, data);
    this.setState(newState);
  };

  render() {
    const MapWithAMarker = withScriptjs(
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
              <div>HEY</div>
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
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
