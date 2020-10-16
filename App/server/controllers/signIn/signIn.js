exports.postSignIn = (req, res, next) => {
  try {
    const { username, password } = req.body;
    req.session.isLoggedIn = true;
    const userInfo = { username, password };
    // res.setHeader("Set-Cookie", "loggedIn=true");
    res.status(200).json({ userInfo, status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
exports.getSignIn = (req, res, next) => {
  try {
    // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
