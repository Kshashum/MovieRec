const express = require("express");
function movieRoute(Movie) {
  const movieRouter = express.Router();
  movieRouter.route("/TopMovies").get((req, res) => {
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
  return movieRouter;
}
module.exports = movieRoute;
