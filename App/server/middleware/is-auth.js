const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  console.log(token, req.body, req.path);
  if (!token) {
    const error = new Error("Not Authenticated.");
    error.statusCode = 401;
    return next(error);
  }

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
