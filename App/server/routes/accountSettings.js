const express = require("express");

const router = express.Router();

const accountSettingsController = require("../controllers/account/accountSettings/accountSettings");

router.patch(
  "/update/username",
  accountSettingsController.patchAccountSettings
);

router.patch(
  "/update/password",
  accountSettingsController.patchAccountSettings
);

router.patch(
  "/update/user-picture",
  accountSettingsController.patchAccountSettings
);

module.exports = router;
