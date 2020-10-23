const Account = require("../../../models/accounts/account");
const bcrypt = require("bcryptjs");

const UPDATE_USERNAME_ROUTE = "/update/username";
const UPDATE_PASSWORD_ROUTE = "/update/password";
const UPDATE_USER_PICTURE = "/update/user-picture";

exports.patchAccountSettings = (req, res, next) => {
  try {
    const PATH = req.route.path;
    const id = req._id;

    switch (PATH) {
      case UPDATE_USERNAME_ROUTE:
        {
          const { username } = req.body;

          Account.findByIdAndUpdate(
            id,
            { username },
            { useFindAndModify: false, new: true },
            (error, account) => {
              if (error) res.status(200).json({ error });

              return account.save();
            }
          ).then(() => {
            res.status(200).json({ username, status: "ok" });
          });
        }
        break;

      case UPDATE_PASSWORD_ROUTE:
        {
          const { password } = req.body;

          bcrypt.hash(password, 12).then((hashedPwd) => {
            Account.findByIdAndUpdate(
              id,
              { password: hashedPwd },
              { useFindAndModify: false, new: true },
              (error, account) => {
                if (error) res.status(200).json({ error });
                return account.save();
              }
            ).then(() => res.status(200).json({ status: "ok" }));
          });
        }
        break;
      case UPDATE_USER_PICTURE:
        {
          const { imageurl } = req.body;

          Account.findByIdAndUpdate(
            id,
            { imageurl },
            { useFindAndModify: false, new: true },
            (error, account) => {
              if (error) res.status(200).json({ error });
              return account.save();
            }
          ).then(() => res.status(200).json({ imageurl, status: "ok" }));
        }
        break;
      default:
        throw new Error();
    }
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
