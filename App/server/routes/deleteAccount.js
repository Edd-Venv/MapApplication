const express = require("express");

const router = express.Router();

const deleteAccountController = require("../controllers/account/deleteAccount");
const isAuth = require("../middleware/is-auth");

router.delete("/delete/account", isAuth, deleteAccountController.deleteAccount);

module.exports = router;
