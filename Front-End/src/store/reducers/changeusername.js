import * as actionTypes from "../actions/changeusername";

const initialState = {
  old_user_name: "",
  new_user_name: "",
};

const changeUserNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OLD_INPUT_NAME:
      try {
        const newState = Object.assign({}, state);
        newState.old_user_name = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }

      break;
    case actionTypes.NEW_INPUT_NAME:
      try {
        const newState = Object.assign({}, state);
        newState.new_user_name = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      return state;
  }
};

export default changeUserNameReducer;
