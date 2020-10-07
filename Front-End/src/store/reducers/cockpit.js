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
  showBackDrop: false,
  isDataLoaded: false,
};

const cockpitReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO: {
      try {
        const newState = Object.assign({}, state, action.response);
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

    default:
      return state;
  }
};

export default cockpitReducer;
