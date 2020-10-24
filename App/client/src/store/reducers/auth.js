import * as actionTypes from "../actions/auth";

const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      try {
        const newState = Object.assign({}, state, action.response);

        return newState;
      } catch (error) {
        const newState = Object.assign({}, state, action.response);

        return newState;
      }
    default:
      return state;
  }
};
export default authReducer;
