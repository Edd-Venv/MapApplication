const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const accountDataController = require("../controllers/account/accountData/accountData");

router.post("/locations", accountDataController.postAccountData);

router.get("/locations", isAuth, accountDataController.getAccountData);

router.patch("/locations/delete", accountDataController.patchAccountData);

module.exports = router;
