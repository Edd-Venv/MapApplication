import {
  InfoWindow,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { handleAddressComponent } from "./Utils";
import Geocode from "react-geocode";
import React from "react";

Geocode.setApiKey("AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8");
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

  handleMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = handleAddressComponent(
          addressArray,
          "administrative_area_level_2"
        ),
        area = handleAddressComponent(addressArray, "sublocality_level_1"),
        state = handleAddressComponent(
          addressArray,
          "administrative_area_level_1"
        );
    });
  };
  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.handleMarkerDragEnd}
            position={{ lat: -34.397, lng: 150.644 }}
          >
            <InfoWindow>
              <div>HEY</div>
            </InfoWindow>
          </Marker>
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
