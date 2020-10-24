import * as actionTypes from "../actions/signin";

const initialState = {
  username: "Guest",
  userImage: "public/images/default.jpeg",
  token: "",
  status: "",
  signInError: false,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      try {
        const newState = Object.assign({}, state, action.response);
        newState.signInError = false;
        return newState;
      } catch (error) {
        console.log("signIn-reducer", error);
      }
      break;
    case actionTypes.ERROR: {
      const newState = Object.assign({}, state, action.error);
      newState.signInError = true;
      return newState;
    }
    case actionTypes.LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
export default signInReducer;
