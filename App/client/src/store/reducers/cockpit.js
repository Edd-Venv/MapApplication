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
  myLocations: [],
  panTo: { lat: 0, lng: 0 },
  selectedMarkerData: { id: "dummy" },
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
        const newState = Object.assign({}, action.state);
        const mapPosition = Object.assign({}, action.state.mapPosition);
        const markerPosition = Object.assign({}, action.state.markerPosition);

        newState.myLocations.push({
          address: newState.address,
          area: newState.area,
          city: newState.city,
          id: new Date(),
          mapPosition,
          markerPosition,
        });
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
        newState.selectedMarkerData = { id: "dummy" };
        return newState;
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
