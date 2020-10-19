const Location = require("../../../models/locations/location");
const Account = require("../../../models/accounts/account");

exports.getAccountData = (req, res, next) => {
  try {
    const userId = req._id;

    Location.find({ userId }).then((locations) => {
      const locationsArray = [...locations];

      res.status(200).json({ locationsArray, status: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};

exports.postAccountData = (req, res, next) => {
  try {
    const { address, area, city, id, mapPosition, markerPosition } = req.body;
    const userId = req._id;

    const location = new Location({
      address,
      area,
      city,
      id,
      mapPosition,
      markerPosition,
      userId,
    });
    location
      .save()
      .then((savedLocation) =>
        Account.findById(userId).then((account) => {
          account.locations.push(savedLocation);
          account.save();
        })
      )
      .then(res.status(201).json({ location, status: "ok" }));
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};

exports.patchAccountData = (req, res, next) => {
  try {
    const { _id } = req.body;
    const userId = req._id;

    Location.findByIdAndRemove(_id).then((deletedLocation) => {
      const deletedLocationId = deletedLocation._id;

      Account.findById(userId).then((account) => {
        account.locations.filter(
          (location) => location._id !== deletedLocationId
        );
        account.save();
      });

      res.status(201).json({ deletedLocationId, status: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
