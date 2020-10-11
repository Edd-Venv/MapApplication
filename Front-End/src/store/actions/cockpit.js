/* eslint-disable arrow-body-style */
import {
  handleComponentMount,
  handleMarkerDragEnd,
  handlePlaceSelected,
} from "../Utils";

export const GET_USER_INFO = "GET_USER_INFO";
export const PLACE_SELECTED = "PLACE_SELECTED";
export const MARKER_END_DRAG = "MARKER_END_DRAG";
export const SAVE_LOCATION = "SAVE_LOCATION";
export const SAVED_LOCATION = "SAVED_LOCATION";
export const SELECT_SAVED_LOCATION = "SELECT_SAVED_LOCATION";
export const CURRENT_LOCATION_INFO_WINDOW = "CURRENT_LOCATION_INFO_WINDOW";
export const CLOSE_CURRENT_LOCATION_INFO_WINDOW =
  "CLOSE_CURRENT_LOCATION_INFO_WINDOW";
export const SELECTED_MARKER_INFO_WINDOW_COORDS =
  "SELECTED_MARKER_INFO_WINDOW_COORDS";
export const CLOSE_SELECTED_MARKER_INFO_WINDOW =
  "CLOSE_SELECTED_MARKER_INFO_WINDOW";

export const setUserInfo = (response) => {
  return {
    type: GET_USER_INFO,
    response,
  };
};
export const getUserInfo = (coords) => {
  return (dispatch) => {
    const data = handleComponentMount(coords.lat, coords.lng);
    data.then((response) => {
      dispatch(setUserInfo(response));
    });
  };
};

export const setPlaceSelected = (response) => {
  return {
    type: PLACE_SELECTED,
    response,
  };
};
export const getPlaceSelected = (place) => {
  return (dispatch) => {
    const data = handlePlaceSelected(place);
    dispatch(setPlaceSelected(data));
  };
};

export const setMarkerEndDrag = (response) => {
  return {
    type: MARKER_END_DRAG,
    response,
  };
};

export const getMarkerEndDrag = (event) => {
  return (dispatch) => {
    const data = handleMarkerDragEnd(event);
    data.then((response) => {
      dispatch(setMarkerEndDrag(response));
    });
  };
};

export const saveMylocations = (state) => {
  return {
    type: SAVE_LOCATION,
    state,
  };
};

export const mySavedLocation = (location) => {
  return {
    type: SAVED_LOCATION,
    location,
  };
};

export const usersLocationInfoWindow = (location) => {
  return {
    type: CURRENT_LOCATION_INFO_WINDOW,
    location,
  };
};
export const closeUsersLocationInfoWindow = () => {
  return {
    type: CLOSE_CURRENT_LOCATION_INFO_WINDOW,
  };
};

export const selectedMarkerInfoWindow = (location) => {
  return {
    type: SELECTED_MARKER_INFO_WINDOW_COORDS,
    location,
  };
};

export const closeSelectedMarkerInfoWindow = () => {
  return {
    type: CLOSE_SELECTED_MARKER_INFO_WINDOW,
  };
};
