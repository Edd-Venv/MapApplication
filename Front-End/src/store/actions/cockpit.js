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
