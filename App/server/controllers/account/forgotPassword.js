const crypto = require("crypto");

const Account = require("../../models/accounts/account");
const Email = require("../../emails/email");

exports.forgotPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) return res.redirect("/forgot/password");
    const token = buffer.toString("hex");
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    const { username } = req.body;

    Account.findOne({ username })
      .then((account) => {
        if (!account) {
          const error = new Error("No Account found.");
          error.statusCode = 404;
          throw error;
        }

        account.resetToken = resetToken;
        account.resetTokenExpiration = Date.now() + 10 * 60 * 1000;
        return account.save();
      })
      .then(async () => {
        try {
          const resetURL = `${req.protocol}://${req.get(
            "host"
          )}/reset/password/${resetToken}`;

          await new Email(req.body, resetURL).sendPasswordReset();
        } catch (error) {
          next(error);
        }
      })
      .then(() => res.status(200).json({ status: "ok" }))
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
};
