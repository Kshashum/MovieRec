const express = require("express");
function searchRouter(client) {
  const searchRoute = express.Router();
  searchRoute.route("/search").get((req, res) => {
    const query = req.query;
    let results;
    client
      .search({
        index: "movies",
        filterPath: ["hits.hits._source"],
        body: {
          query: {
            match: query,
          },
        },
      })
      .then((res) => {
        const { body } = res;
        return body;
      })
      .then((data) => {
        data = data.hits.hits;
        results = data.map((item) => {
          return item._source;
        });

        return res.json(results);
      })
      .catch((err) => {
        console.log("error is : " + err.message);
      });
  });
  return searchRoute;
}
module.exports = searchRouter;
