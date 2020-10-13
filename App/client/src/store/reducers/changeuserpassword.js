import * as actionTypes from "../actions/changeuserpassword";

const initialState = {
  old_password: "",
  new_password: "",
};

const changeUserPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OLD_PASSWORD:
      try {
        const newState = Object.assign({}, state);
        newState.old_password = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }

      break;
    case actionTypes.NEW_PASSWORD:
      try {
        const newState = Object.assign({}, state);
        newState.new_password = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      return state;
  }
};

export default changeUserPasswordReducer;
