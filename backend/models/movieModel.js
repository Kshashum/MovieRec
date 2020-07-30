const mongoose = require("mongoose");
const { Schema } = mongoose;
const movieModel = new Schema({
  imdbId: String,
  ["Imdb Link"]: String,
  Title: String,
  ["IMDB Score"]: Number,
  Genre: String,
  Poster: String,
});
module.exports = mongoose.model("Movie", movieModel);
