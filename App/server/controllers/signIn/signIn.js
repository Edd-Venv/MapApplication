const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../../models/accounts/account");

exports.postSignIn = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user;

    Account.findOne({ username })
      .then((account) => {
        if (!account) {
          const error = new Error("No Account Found");
          return next(error);
        }
        user = account;
        return bcrypt.compare(password, account.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong Password");
          return next(error);
        }
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          "EDWINRULES",
          { expiresIn: "1hr" }
        );
        res.status(200).json({
          token,
          _id: user._id,
          username: user.username,
          userImage: user.imageurl,
          status: "ok",
        });
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
