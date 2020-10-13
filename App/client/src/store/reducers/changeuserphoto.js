import * as actionTypes from "../actions/changeuserphoto";

const initialState = {
  blob: null,
};

const changeUserPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INPUT_BLOB:
      try {
        const newState = Object.assign({}, state);
        newState.blob = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      return state;
  }
};

export default changeUserPhotoReducer;
