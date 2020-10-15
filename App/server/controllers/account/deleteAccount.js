const Account = require("../../models/accounts/account");

exports.deleteAccount = (req, res, next) => {
  try {
    const { id } = req.body;
    Account.deleteById(id);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
