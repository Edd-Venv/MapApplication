const Account = require("../../models/accounts/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignIn = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user;

    Account.findOne({ username })
      .then((account) => {
        if (!account) {
          const error = new Error("No Account Found");
          next(error);
        }
        user = account;
        return bcrypt.compare(password, account.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong Password");
          next(error);
        }
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          "EDWINRULES",
          { expiresIn: "1hr" }
        );
        res.status(200).json({ token, _id: user._id, status: "ok" });
      })
      .catch((err) => {
        //throw new Error(err);
        next(err);
      });
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
