const bcrypt = require("bcryptjs");
const Account = require("../../models/accounts/account");

exports.signUp = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let imageurl = "public/images/default.jpeg";

    Account.findOne({ username }, (error, response) => {
      if (error) console.log(error);

      if (!response) {
        if (!req.file) {
          const err = new Error("No image provided");
          err.statusCode = 422;
          console.log("No image provided");
        }

        if (req.file) imageurl = `${req.file.destination}/${req.file.filename}`;

        bcrypt
          .hash(password, 12)
          .then((hashedPwd) => {
            const account = new Account({
              username,
              password: hashedPwd,
              imageurl,
            });
            return account.save();
          })
          .then((result) => {
            res.status(201).json({
              status: "ok",
              message: "Account Created.",
              userId: result._id,
            });
          });
      } else {
        const err = new Error("Entered User-Name Is Already Taken.");
        err.statusCode = 500;
        next(err);
      }
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
