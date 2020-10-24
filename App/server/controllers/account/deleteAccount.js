const Account = require("../../models/accounts/account");
const deleteAccountPhoto = require("../../utils/file");

exports.deleteAccount = (req, res, next) => {
  try {
    const { _id } = req.body;

    Account.findByIdAndDelete(_id, (err, resp) => {
      if (err) console.log(err);
      let path = "";
      if (resp.imageurl !== "pulic/images/default.jpeg") path = resp.imageurl;

      deleteAccountPhoto.deleteFile(path);
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
