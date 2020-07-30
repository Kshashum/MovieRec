const express = require("express");
function autocompleteRoute(client) {
  const autocompleteRouter = express.Router();
  autocompleteRouter.route("/autocomplete").get((req, res) => {
    const query = req.query;
    let results;
    client
      .search({
        index: "movies",
        body: {
          sort: [{ _score: { order: "desc" } }],
          query: {
            multi_match: {
              query: query["search"],
              fields: ["Title", "Genre"],
            },
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

  return autocompleteRouter;
}
module.exports = autocompleteRoute;
