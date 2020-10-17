const Location = require("../../../models/locations/location");

exports.getAccountData = (req, res, next) => {
  try {
    Location.find().then((locations) => {
      const locationsArray = [...locations];

      res.status(200).json({ locationsArray, status: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};

exports.postAccountData = (req, res, next) => {
  try {
    const {
      address,
      area,
      city,
      id,
      mapPosition,
      markerPosition,
      userId,
    } = req.body;

    const location = new Location({
      address,
      area,
      city,
      id,
      mapPosition,
      markerPosition,
      userId,
    });
    location.save();
    res.status(201).json({ location, status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};

exports.patchAccountData = (req, res, next) => {
  try {
    const { _id } = req.body;

    Location.findByIdAndRemove(_id).then((deletedLocation) => {
      const deletedLocationId = deletedLocation._id;

      res.status(201).json({ deletedLocationId, status: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
