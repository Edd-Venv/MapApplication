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

module.exports = mongoose.model("Location", locationSchema);
