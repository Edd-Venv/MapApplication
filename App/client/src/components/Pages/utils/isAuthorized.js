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
      if (result.message) {
        const error = new Error(result.message);
        error.statusCode = 401;
        localStorage.setItem("userImage", "public/images/default.jpeg");
        localStorage.setItem("username", "Guest");
        throw error;
      }
      if (result.status === "ok") {
        return (auth = { authorized: true });
      }
    })
    .catch((error) => {
      auth = { authorized: false, error };
    });
  return auth;
}

export default isAuthorized;
