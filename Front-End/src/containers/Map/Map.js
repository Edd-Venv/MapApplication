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
import mapStyle from "./MapStyle";
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
  styles: mapStyle,
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      panTo: { lat: 0, lng: 0 },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should Update?");
    //console.log(nextState.panTo, nextProps.state.panTo);
    //if (nextProps.state.zoom !== nextState.zoom) return false;
    //if (nextState.panTo.lat !== nextProps.state.panTo.lat) return false;
    return true;
  }

  render() {
    const locations = this.props.state.myLocations;
    let usersInforWindow = null;
    let savedLocations = null;
    let savedLocationInfoWindow = null;

    if (this.props.state.showInfoWindow) {
      usersInforWindow = (
        <InfoWindow onCloseClick={() => this.props.onCloseUserInfoWindow()}>
          <SaveButton
            state={this.props.state}
            onSaveLocation={this.props.onSaveLocation}
          />
        </InfoWindow>
      );
    }

    if (this.props.state.selectedMarkerData) {
      savedLocationInfoWindow = (
        <InfoWindow
          position={this.props.state.selectedMarkerData.markerPosition}
          onCloseClick={() => this.props.onCloseSelectedMarkerInfoWindow()}
        >
          <p>{this.props.state.selectedMarkerData.address}</p>
        </InfoWindow>
      );
    }

    if (locations.length > 0) {
      savedLocations = locations.map((location) => {
        let show = false;

        if (location.id && this.props.state.selectedMarkerData.id)
          if (location.id === this.props.state.selectedMarkerData.id)
            show = true;

        return (
          <Marker
            key={location.id}
            position={{
              lat: location.markerPosition.lat,
              lng: location.markerPosition.lng,
            }}
            onClick={() => this.props.onSelectedMarkerInfoWindow(location)}
          >
            {show ? savedLocationInfoWindow : null}
          </Marker>
        );
      });
    }

    const GMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap
          onLoad={this.mapRef}
          defaultZoom={this.state.zoom}
          defaultCenter={{
            lat: this.props.state.mapPosition.lat,
            lng: this.props.state.mapPosition.lng,
          }}
          ref={(map) => {
            this.mapRef = map;
          }}
          onZoomChanged={() => this.setState({ zoom: this.mapRef.getZoom() })}
          options={options}
        >
          {savedLocations}
          <Marker
            draggable
            onDragEnd={this.props.onMarkerDragEnd}
            position={{
              lat: this.props.state.markerPosition.lat,
              lng: this.props.state.markerPosition.lng,
            }}
            onClick={() => {
              this.props.onShowUserInfoWindow();
            }}
            onDrag={(event) => {
              /* this.setState(
                {
                  panTo: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                },
                this.mapRef.panTo(event.latLng)
              ); */
            }}
          >
            {usersInforWindow}
          </Marker>
          <div style={InputContainer}>
            <AutoComplete
              types={["(regions)"]}
              onPlaceSelected={this.props.onPlaceSelected}
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
  }
}
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
