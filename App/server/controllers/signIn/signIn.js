exports.signIn = (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userInfo = { username, password };
    res.status(200).json({ userInfo, status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
