const express = require("express");
const { remove } = require("../models/userModel");
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
    new User(body).save().catch((err) => {
      console.log("error is :" + err.message);
      return res.json({ created: false }).status(409);
    });
    return res.json({ created: true }).status(201);
  });
  return userRoute;
}
module.exports = userRouter;
