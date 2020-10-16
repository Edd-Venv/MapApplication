const mongoose = require("mongoose");

const { Schema } = mongoose;

const accountSchema = new Schema({
  username: String,
  password: String,
  imageurl: String,
});

module.exports = mongoose.model("Account", accountSchema);
/* const mongodb = require("mongodb");
const { getDb } = require("../../utils/database");

const ObjectId = mongodb.ObjectId;

module.exports = class Account {
  constructor(username, password, imageurl, id) {
    this.username = username;
    this.password = password;
    this.imageurl = imageurl ? imageurl : null;
    this._id = id ? id : null;
  }

  save() {
    const db = getDb();
    return db.collection("accounts").insertOne(this);
  }

  updateUsername(username) {
    const db = getDb();
    db.collection("accounts").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { username } }
    );
  }

  updatePassword(password) {
    const db = getDb();
    db.collection("accounts").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { password } }
    );
  }

  updateImageUrl(imageurl) {
    const db = getDb();
    db.collection("accounts").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { imageurl } }
    );
  }

  static fetchAll() {
    const db = getDb();
    db.collection("accounts")
      .find()
      .toArray()
      .then((locations) => locations)
      .catch((error) => {
        console.log(error);
      });
  }

  static findById(id) {
    const db = getDb();
    return db.collection("accounts").findOne({ _id: new ObjectId(id) });
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection("accounts").deleteOne({ _id: new ObjectId(id) });
  }
};
 */
