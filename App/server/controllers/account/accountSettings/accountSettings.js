const Account = require("../../../models/accounts/account");

const UPDATE_USERNAME_ROUTE = "/update/username";
const UPDATE_PASSWORD_ROUTE = "/update/password";
const UPDATE_USER_PICTURE = "/update/user-picture";

exports.patchAccountSettings = (req, res, next) => {
  try {
    const PATH = req.route.path;

    switch (PATH) {
      case UPDATE_USERNAME_ROUTE:
        {
          const { username, id } = req.body;

          Account.findByIdAndUpdate(id, { username }, () => {
            res.status(200).json({ status: "ok" });
          });
        }
        break;
      case UPDATE_PASSWORD_ROUTE:
        {
          const { password, id } = req.body;

          Account.findByIdAndUpdate(id, { password }, () => {
            res.status(200).json({ status: "ok" });
          });
        }
        break;
      case UPDATE_USER_PICTURE:
        {
          const { imageurl, id } = req.body;

          Account.findByIdAndUpdate(id, { imageurl }, () => {
            res.status(200).json({ status: "ok" });
          });
        }
        break;
      default:
        throw new Error();
    }
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
