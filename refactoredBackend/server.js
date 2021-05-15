const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const movieRouter = require("./routers/movieRouter");
const authRouter = require("./routers/authRouter");
require("dotenv").config()

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect('mongodb://localhost/movieAPI', {useUnifiedTopology: true,useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(express.json());
app.use(cors());

app.use("/api/v1/movies",movieRouter);
app.use("/api/v1/auth",authRouter)
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`running port on ${port}`));
