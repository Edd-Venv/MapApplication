const express = require("express");

const router = express.Router();

const signUpController = require("../controllers/signUp/signUp");

router.post("/sign-up", signUpController.signUp);

module.exports = router;
