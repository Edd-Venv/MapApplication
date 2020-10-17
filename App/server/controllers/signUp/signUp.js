const Account = require("../../models/accounts/account");

exports.signUp = (req, res, next) => {
  try {
    const { username, password, imageurl } = req.body;

    const account = new Account({ username, password, imageurl });
    account.save();
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
