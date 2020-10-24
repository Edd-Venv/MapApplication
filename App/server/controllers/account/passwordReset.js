const bcrypt = require("bcryptjs");

const Account = require("../../models/accounts/account");

exports.resetPassword = (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params.token;

  try {
    Account.findOne({ resetToken: token }).then((account) => {
      if (!account) {
        const error = new Error("Account Not Found.");
        throw error;
      }

      if (!(account.resetTokenExpiration > Date.now())) {
        const error = new Error("Reset Token Has Expired!");
        throw error;
      }

      if (account.resetTokenExpiration > Date.now()) {
        bcrypt
          .hash(password, 12)
          .then((hashedPwd) => {
            account.password = hashedPwd;
            return account.save();
          })
          .then((result) => {
            res.status(201).json({
              status: "ok",
              message: "Password Reset.",
            });
          });
      }
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    next(err);
  }
};
