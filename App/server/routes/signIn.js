const express = require("express");

const router = express.Router();
const signInController = require("../controllers/signIn/signIn");

router.post("/sign-in", signInController.signIn);

module.exports = router;
