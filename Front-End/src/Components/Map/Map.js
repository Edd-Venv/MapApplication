import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

import AutoComplete from "react-google-autocomplete";
import PropTypes from "prop-types";
import React from "react";
import Classes from "./Map.module.css";
import SaveButton from "../SaveButton/SaveButton";

const Map = (props) => {
  const GMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: props.state.mapPosition.lat,
          lng: props.state.mapPosition.lng,
        }}
      >
        <Marker
          draggable
          onDragEnd={props.onMarkerDragEnd}
          position={{
            lat: props.state.markerPosition.lat,
            lng: props.state.markerPosition.lng,
          }}
        >
          <InfoWindow>
            <SaveButton state={props.state} />
          </InfoWindow>
        </Marker>
        <AutoComplete
          types={["(regions)"]}
          onPlaceSelected={props.onPlaceSelected}
        />
      </GoogleMap>
    ))
  );
  return (
    <GMap
      data-test="component-map"
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div className={Classes.map_container} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};
Map.propTypes = {
  state: PropTypes.object.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
};

export default Map;
