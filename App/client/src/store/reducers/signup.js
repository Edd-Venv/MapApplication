import * as actionTypes from "../actions/signup";

const initialState = {
  name: "",
  password: "",
  blob: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INPUT_NAME:
      try {
        const newState = Object.assign({}, state);
        newState.name = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }
      break;
    case actionTypes.INPUT_PASSWORD:
      try {
        const newState = Object.assign({}, state);
        newState.password = action.response;
        return newState;
      } catch (error) {
        console.log(error);
      }

      break;
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
export default signUpReducer;
