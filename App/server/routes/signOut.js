const express = require("express");

const router = express.Router();

router.post("/signOut", (req, res, next) => {
  try {
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
});

module.exports = router;
