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

const ServerUrl = "http://18.222.115.53:4030";

const InputContainer = { display: "flex", justifyContent: "center" };
const style = {
  position: "fixed",
  zIndex: 100,
  top: 70,
  margin: "0 auto",
  borderColor: "black",
  borderRadius: "50px",
  backgroundColor: "rgba(201, 201, 201, 0.9)",
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
  const locations = props.state.myLocations.locationsArray;

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
          <Button
            buttonClick={() =>
              props.onDeleteSavedLocation(props.state.selectedMarkerData._id)
            }
            buttonType="button"
            className="Danger"
          >
            Delete Location
          </Button>
        </div>
      </InfoWindow>
    );
  }

  if (!props.authError) {
    if (locations.length > 0) {
      savedLocations = locations.map((location) => {
        let show = false;
        if (location._id === props.state.selectedMarkerData._id) show = true;

        //`${ServerUrl}public/icons/mappin.png",
        return (
          <Marker
            draggable={false}
            icon={{
              url: `${ServerUrl}public/icons/map-pin.png`,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
            key={location._id}
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
          icon={{
            url: `${ServerUrl}public/icons/user-pin.png`,
            scaledSize: new window.google.maps.Size(40, 45),
          }}
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
