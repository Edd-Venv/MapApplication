import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import mapStyle from "./MapStyle";
import Button from "../../components/UI/Button/Button";
import LocateMe from "../../components/UI/Locate/Locate";

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
  styles: mapStyle,
};
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const Map = (props) => {
  const locations = props.state.myLocations;

  const currentLocationMarkerRef = useRef(null);

  let usersInforWindow = null;
  let savedLocations = null;
  let savedLocationInfoWindow = null;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8",
    libraries,
  });

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return null;

  if (props.state.showInfoWindow) {
    usersInforWindow = (
      <InfoWindow onCloseClick={() => props.onCloseUserInfoWindow()}>
        <div>
          <p>{props.state.address}</p>
          <Button
            buttonClick={() => props.onSaveLocation(props.state)}
            type="button"
          >
            Save Location
          </Button>
        </div>
      </InfoWindow>
    );
  }

  if (props.state.selectedMarkerData) {
    savedLocationInfoWindow = (
      <InfoWindow
        position={props.state.selectedMarkerData.markerPosition}
        onCloseClick={() => props.onCloseSelectedMarkerInfoWindow()}
      >
        <div>
          <p>{props.state.selectedMarkerData.address}</p>
          <Button buttonClick={() => {}} buttonType="button" className="Danger">
            Delete Location
          </Button>
        </div>
      </InfoWindow>
    );
  }

  if (locations.length > 0) {
    savedLocations = locations.map((location) => {
      let show = false;

      if (location.id && props.state.selectedMarkerData.id)
        if (location.id === props.state.selectedMarkerData.id) show = true;

      return (
        <Marker
          draggable={false}
          key={location.id}
          position={{
            lat: location.markerPosition.lat,
            lng: location.markerPosition.lng,
          }}
          onClick={() => props.onSelectedMarkerInfoWindow(location)}
        >
          {show ? savedLocationInfoWindow : null}
        </Marker>
      );
    });
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={{
          lat: props.state.mapPosition.lat,
          lng: props.state.mapPosition.lng,
        }}
        options={options}
      >
        {savedLocations}
        <Marker
          draggable={true}
          onDragEnd={props.onMarkerDragEnd}
          position={{
            lat: props.state.markerPosition.lat,
            lng: props.state.markerPosition.lng,
          }}
          onClick={() => {
            props.onShowUserInfoWindow();
          }}
          ref={currentLocationMarkerRef}
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
        <LocateMe />
      </GoogleMap>
    </div>
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

/*
icon={{
              url: "../../assets/Images/icons/infomation.svg",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
 */
