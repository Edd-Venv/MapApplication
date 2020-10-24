const express = require("express");

const router = express.Router();

const resetPasswordController = require("../controllers/account/passwordReset");

router.put("/reset/password/:token", resetPasswordController.resetPassword);

module.exports = router;
