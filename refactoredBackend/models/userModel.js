const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  watchedMovies: Array,
  recommendedMovies: Array,
},{collection:'users'});
module.exports = mongoose.model("user", userModel);