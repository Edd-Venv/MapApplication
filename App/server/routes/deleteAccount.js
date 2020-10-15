const express = require("express");

const router = express.Router();

const deleteAccountController = require("../controllers/account/deleteAccount");

router.delete("/delete/account", deleteAccountController.deleteAccount);

module.exports = router;
