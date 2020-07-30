const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  watchedMovies: Array,
  recommendedMovies: Array,
  login: Boolean,
});
module.exports = mongoose.model("User", userModel);
