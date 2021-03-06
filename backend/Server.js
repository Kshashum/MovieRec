const express = require("express");
const mongoose = require("mongoose");
const { Client } = require("@elastic/elasticsearch");
const cors = require('cors')

const app = express();
const port = 4000;
const db = mongoose.connect("mongodb://localhost/moviesAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const client = new Client({ node: "http://localhost:9200" });

const Movie = require("./models/movieModel");
const User = require("./models/userModel");

const movieRouter = require("./routers/moviesRouter")(Movie);
const autocompleteRouter = require("./routers/autocompleteRouter")(client);
const searchRouter = require("./routers/searchRouter")(client);
const userRouter = require("./routers/userRouter")(User);

app.use(express.json());
app.use(cors());

app.use("/api/v1", movieRouter);
app.use("/api/v1", autocompleteRouter);
app.use("/api/v1", searchRouter);
app.use("/api/v1", userRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`running port on ${port}`));
