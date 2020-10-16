const express = require("express");

const router = express.Router();
const signInController = require("../controllers/signIn/signIn");

router.post("/sign-in", signInController.postSignIn);

router.get("/sign-in", signInController.getSignIn);

module.exports = router;
