const mongoose = require("mongoose");

const { Schema } = mongoose;

const accountSchema = new Schema({
  username: String,
  password: String,
  imageurl: String,
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
});

module.exports = mongoose.model("Account", accountSchema);
