import * as actionTypes from "../actions/cockpit";

const initialState = {
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
  myLocations: { locationsArray: [] },
  panTo: { lat: 0, lng: 0 },
  selectedMarkerData: { _id: "dummy" },
  showBackDrop: false,
  isDataLoaded: false,
  getUserLocation: true,
  showInfoWindow: false,
};

const cockpitReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCATE_ME:
      try {
        const newMapPosition = { mapPosition: action.response.mapPosition };
        const newMarkerPosition = {
          markerPosition: action.response.markerPosition,
        };
        const newState = Object.assign(
          {},
          state,
          action.response,
          newMapPosition,
          newMarkerPosition
        );
        newState.isDataLoaded = true;

        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    case actionTypes.FETCH_LOCATIONS:
      try {
        const newState = Object.assign({}, state);
        newState.myLocations = action.locations;
        newState.clientSideLocations = action.locations;

        return newState;
      } catch (error) {
        console.log(error);
      }

      break;
    case actionTypes.GET_USER_INFO: {
      try {
        const newMapPosition = { mapPosition: action.response.mapPosition };
        const newMarkerPosition = {
          markerPosition: action.response.markerPosition,
        };
        const newState = Object.assign(
          {},
          state,
          action.response,
          newMapPosition,
          newMarkerPosition
        );

        newState.isDataLoaded = true;
        return newState;
      } catch (error) {
        console.log(error);
      }

      break;
    }
    case actionTypes.PLACE_SELECTED: {
      try {
        const newMapPosition = { mapPosition: action.response.mapPosition };
        const newMarkerPosition = {
          markerPosition: action.response.markerPosition,
        };
        const newState = Object.assign(
          {},
          state,
          action.response,
          newMapPosition,
          newMarkerPosition
        );

        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.MARKER_END_DRAG: {
      try {
        const newState = Object.assign({}, state, action.response);
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.SAVE_LOCATION: {
      try {
        const newState = Object.assign({}, state);
        newState.myLocations.locationsArray.push(action.savedLocation.location);
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.SAVED_LOCATION: {
      try {
        const newState = Object.assign({}, state, action.location);

        newState.getUserLocation = false;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.DELETE_LOCATION:
      try {
        const newState = Object.assign({}, state);
        const locationArray = newState.myLocations.locationsArray.filter(
          (location) => location._id !== action.locationId.deletedLocationId
        );

        newState.myLocations.locationsArray = locationArray;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    case actionTypes.CURRENT_LOCATION_INFO_WINDOW: {
      try {
        const newState = Object.assign({}, state);
        newState.showInfoWindow = true;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.CLOSE_CURRENT_LOCATION_INFO_WINDOW: {
      try {
        const newState = Object.assign({}, state);
        newState.showInfoWindow = false;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.SELECTED_MARKER_INFO_WINDOW_COORDS: {
      try {
        const newSelectedMarkerInfoWindowCoords = {
          selectedMarkerData: action.location,
        };
        const newState = Object.assign(
          {},
          state,
          newSelectedMarkerInfoWindowCoords
        );

        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.CLOSE_SELECTED_MARKER_INFO_WINDOW: {
      try {
        const newState = Object.assign({}, state);
        newState.selectedMarkerData = { _id: "dummy" };
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case actionTypes.RESET_COCKPIT_STATE: {
      try {
        return initialState;
      } catch (error) {
        console.log(error);
      }
      break;
    }

    default:
      return state;
  }
};

export default cockpitReducer;
