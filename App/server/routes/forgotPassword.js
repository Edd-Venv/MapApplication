const express = require("express");

const router = express.Router();

const forgotPasswordController = require("../controllers/account/forgotPassword");

router.put("/forgot/password", forgotPasswordController.forgotPassword);

module.exports = router;
