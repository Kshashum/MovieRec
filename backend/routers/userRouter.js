const express = require("express");
const { remove, update } = require("../models/userModel");
function userRouter(User) {
  const userRoute = express.Router();
  userRoute.route("/Users").get((req, res) => {
    const query = req.query;
    User.find({ email: query["email"] })
      .then((data) => {
        if (data[0]["password"] === query["password"]) {
          data[0]["password"] = "******";
          data[0]["login"] = true;
          return res.json(data).status(200);
        }
        return res.json({ login: "false" }).status(401);
      })
      .catch((err) => {
        console.log("error is :" + err.message);
      });
  });
  userRoute.route("/Users").post((req, res) => {
    const { body } = req;
    console.log(body)
    new User(body).save().catch((err) => {
      console.log("error is :" + err.message);
      return res.json({ created: false }).status(409);
    });
    User.find({ email: body["email"] })
    .then((data) => {
      if (data[0]["password"] === body["password"]) {
        data[0]["password"] = "******";
        data[0]["login"] = true;
        return res.json(data).status(200);
      }
      return res.json({ login: "false" }).status(401);
    })
    .catch((err) => {
      console.log("error is :" + err.message);
    });

  });
  userRoute.route("/UsersUpdate").post((req, res) => {
    const { body } = req;
    User.updateOne({ _id: body._id }, { watchedMovies: body.watchedMovies })
      .then((data) => {
        return res.status(200);
      })
      .catch((err) => console.log("error is " + err.message));
  });
  return userRoute;
}
module.exports = userRouter;
