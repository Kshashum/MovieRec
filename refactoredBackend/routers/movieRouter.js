const movieRouter = require("express").Router();
const Movie = require('../models/movieModel')
movieRouter.get('/TopMovies', function(req, res) {
    Movie.find()
    .sort({ "IMDB Score": -1 })
    .limit(18)
    .exec((err, movies) => {
      if (err) {
        return res.error;
      }
      return res.json(movies);
    });
  });
  
module.exports = movieRouter;