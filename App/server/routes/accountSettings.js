const express = require("express");

const router = express.Router();

const accountSettingsController = require("../controllers/account/accountSettings/accountSettings");
const isAuth = require("../middleware/is-auth");

router.patch(
  "/update/username",
  isAuth,
  accountSettingsController.patchAccountSettings
);

router.patch(
  "/update/password",
  isAuth,
  accountSettingsController.patchAccountSettings
);

router.patch(
  "/update/user-picture",
  isAuth,
  accountSettingsController.patchAccountSettings
);

module.exports = router;
