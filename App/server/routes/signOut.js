const express = require("express");

const router = express.Router();

const signOutController = require("../controllers/signOut/signOut");

router.post("/sign-out", signOutController.signOut);

module.exports = router;
