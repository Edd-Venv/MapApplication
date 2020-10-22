const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader, req.body, req.path);
  if (!authHeader) {
    const error = new Error("Not Authenticated.");
    error.statusCode = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "EDWINRULES");
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;

    return next(error);
  }
  req._id = decodedToken._id;

  return next();
};
