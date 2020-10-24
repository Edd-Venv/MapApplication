/* eslint-disable arrow-body-style */
import isAuthorized from "../../components/Pages/utils/isAuthorized";

export const AUTH = "AUTH";

export const setAuth = (response) => {
  return {
    type: AUTH,
    response,
  };
};
export const getAuth = () => {
  return (dispatch) => {
    isAuthorized("http://localhost:4030/saved/locations", "GET").then((res) => {
      const { authorized, error } = res;
      if (!authorized) {
        return dispatch(
          setAuth({
            error: true,
            authenticated: false,
            errorStatus: error.statusCode,
            errorMessage: error.message,
          })
        );
      }
      return dispatch(
        setAuth({
          authenticated: true,
        })
      );
    });
  };
};
