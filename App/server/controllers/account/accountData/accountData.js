const Location = require("../../../models/locations/location");

exports.getAccountData = (req, res, next) => {
  try {
    Location.fetchAll().then((locations) => {
      res.status(200).json({ locations, status: "ok" });
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
      userID,
    } = req.body;
    const locations = new Location(
      address,
      area,
      city,
      id,
      mapPosition,
      markerPosition,
      userID
    );
    locations.save();
    res.status(200).json({ locations, status: "ok" });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};

exports.patchAccountData = (req, res, next) => {
  try {
    Location.deleteById(req.body.id).then((locations) => {
      res.status(200).json({ locations, status: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error, status: "bad request" });
  }
};
