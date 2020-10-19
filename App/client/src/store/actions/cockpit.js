/* eslint-disable arrow-body-style */
import {
  handleComponentMount,
  handleMarkerDragEnd,
  handlePlaceSelected,
} from "../Utils";

export const LOCATE_ME = "LOCATE_ME";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const GET_USER_INFO = "GET_USER_INFO";
export const FETCH_LOCATIONS = "FETCH_LOCATIONS";
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

export const setLocateMe = (response) => {
  return {
    type: LOCATE_ME,
    response,
  };
};

export const getLocateMe = (coords) => {
  return (dispatch) => {
    const data = handleComponentMount(coords.lat, coords.lng);
    data.then((response) => {
      dispatch(setLocateMe(response));
    });
  };
};

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

export const setMylocations = (locations) => {
  return {
    type: FETCH_LOCATIONS,
    locations,
  };
};
export const getMyLocations = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    fetch("http://localhost:4030/saved/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((locations) => {
        dispatch(setMylocations(locations));
      });
  };
};
export const setMylocation = (savedLocation) => {
  return {
    type: SAVE_LOCATION,
    savedLocation,
  };
};
export const setDeleteSelectedLocation = (locationId) => {
  return {
    type: DELETE_LOCATION,
    locationId,
  };
};

export const deleteSelectedLocation = (_id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4030/saved/locations/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id,
      }),
    })
      .then((response) => response.json())
      .then((id) => dispatch(setDeleteSelectedLocation(id)));
  };
};
export const saveMyLocation = (state) => {
  return (dispatch) => {
    const newState = Object.assign({}, state);
    const mapPosition = Object.assign({}, state.mapPosition);
    const markerPosition = Object.assign({}, state.markerPosition);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("_id");
    fetch("http://localhost:4030/saved/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: newState.address,
        area: newState.area,
        city: newState.city,
        mapPosition,
        markerPosition,
        userId,
      }),
    })
      .then((response) => response.json())
      .then((savedLocation) => dispatch(setMylocation(savedLocation)));
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
