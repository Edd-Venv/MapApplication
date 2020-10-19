async function isAuthorized(Url, Method) {
  let auth;
  await fetch(Url, {
    method: Method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message === "jwt expired") {
        const error = new Error(result.message);
        error.statusCode = 401;

        throw error;
      } else {
        auth = { authorized: true };
      }
    })
    .catch((error) => {
      auth = { authorized: false, error };
    });
  return auth;
}

export default isAuthorized;
