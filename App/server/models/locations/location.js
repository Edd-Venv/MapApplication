const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  address: { type: String, required: true },
  area: String,
  city: String,
  mapPosition: { type: Object, required: true },
  markerPosition: { type: Object, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});
// userID: { type: String, required: true },
module.exports = mongoose.model("Location", locationSchema);

/* const mongodb = require("mongodb");
const { getDb } = require("../../utils/database");

module.exports = class Location {
  constructor(address, area, city, mapPosition, markerPosition, userID) {
    this.address = address;
    this.area = area;
    this.city = city;
    this.mapPosition = mapPosition;
    this.markerPosition = markerPosition;
    this.userID = userID;
  }

  save() {
    const db = getDb();
    return db
      .collection("locations")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log.log(error);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("locations")
      .find()
      .toArray()
      .then((locations) => locations)
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("locations")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(() => console.log("deleted"))
      .catch((error) => console.log(error));
  }
}; */
