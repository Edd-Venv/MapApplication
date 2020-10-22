/* eslint-disable arrow-body-style */
export const SIGN_IN = "SIGN_IN";
export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";

export const setSignIn = (response, error) => {
  if (error) return { type: ERROR, error };

  return {
    type: SIGN_IN,
    response,
  };
};

export const getSignIn = (state) => {
  return (dispatch) => {
    const { name, password } = state;

    fetch("http://localhost:4030/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          const error = new Error();
          error.message = result.message;
          throw error;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userImage");
          localStorage.setItem("token", result.token);
          localStorage.setItem("userImage", result.userImage);
          localStorage.setItem("_id", result._id);
          localStorage.setItem("username", result.username);
          dispatch(setSignIn(result, null));
        }
      })
      .catch((err) => dispatch(setSignIn(null, err)));
  };
};

export const signOut = () => {
  localStorage.clear({
    username: "username",
    token: "token",
    _id: "_id",
    userImage: "userImage",
  });
  localStorage.setItem("userImage", "public/images/default.jpeg");
  localStorage.setItem("username", "Guest");
  return {
    type: LOGOUT,
  };
};
