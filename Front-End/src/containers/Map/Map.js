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
import classes from "./Map.module.css";
import SaveButton from "../../components/SaveButton/SaveButton";

const InputContainer = { display: "flex", justifyContent: "center" };
const style = {
  position: "fixed",
  zIndex: 100,
  top: 70,
  margin: "0 auto",
  borderColor: "black",
  borderTopLeftRadius: "50px",
  borderBottomLeftRadius: "50px",
  borderTopRightRadius: "50px",
  borderBottomRightRadius: "50px",
  backgroundColor: "rgba(201, 201, 201, 0.66)",
  outline: 0,
  fontSize: "1.2rem",
  fontFamily: "Roboto Condensed, sans-serif",
};
const options = {
  clickableIcons: false,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const locations = props.state.myLocations;
  let usersInforWindow = null;
  let savedLocations = null;
  let savedLocationInfoWindow = null;

  if (props.state.showInfoWindow) {
    usersInforWindow = (
      <InfoWindow onCloseClick={() => props.onCloseUserInfoWindow()}>
        <SaveButton state={props.state} onSaveLocation={props.onSaveLocation} />
      </InfoWindow>
    );
  }

  if (locations.length > 0) {
    savedLocations = locations.map((location) => (
      <Marker
        key={location.id}
        position={{
          lat: location.markerPosition.lat,
          lng: location.markerPosition.lng,
        }}
        onClick={() => props.onSelectedMarkerInfoWindow(location)}
      />
    ));
  }

  if (props.state.selectedMarkerData) {
    savedLocationInfoWindow = (
      <InfoWindow
        position={props.state.selectedMarkerData.markerPosition}
        onCloseClick={() => props.onCloseSelectedMarkerInfoWindow()}
      >
        <p>{props.state.selectedMarkerData.address}</p>
      </InfoWindow>
    );
  }

  const GMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: props.state.mapPosition.lat,
          lng: props.state.mapPosition.lng,
        }}
        options={options}
      >
        {savedLocations}
        {savedLocationInfoWindow}
        <Marker
          draggable
          onDragEnd={props.onMarkerDragEnd}
          position={{
            lat: props.state.markerPosition.lat,
            lng: props.state.markerPosition.lng,
          }}
          onClick={() => {
            props.onShowUserInfoWindow();
          }}
        >
          {usersInforWindow}
        </Marker>
        <div style={InputContainer}>
          <AutoComplete
            types={["(regions)"]}
            onPlaceSelected={props.onPlaceSelected}
            style={style}
          />
        </div>
      </GoogleMap>
    ))
  );
  return (
    <GMap
      data-test="component-map"
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div className={classes.map_container} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};
Map.propTypes = {
  state: PropTypes.object.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  onSaveLocation: PropTypes.func.isRequired,
  onShowUserInfoWindow: PropTypes.func.isRequired,
  onCloseUserInfoWindow: PropTypes.func.isRequired,
  onSelectedMarkerInfoWindow: PropTypes.func.isRequired,
  onCloseSelectedMarkerInfoWindow: PropTypes.func.isRequired,
};

export default Map;
