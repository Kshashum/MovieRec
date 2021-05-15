const authRouter = require("express").Router();
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


authRouter.get('/login', async (req,res)=>{
    const {email,password}=req.query
    User.find({email:email})
    .then((data) => {
    
      if (data[0]["password"] === password) {
        data[0]["password"] = "******";
        const token = jwt.sign({
            _id: data[0]._id
        }, process.env.JWTKEY, { expiresIn: '1h' });
        return res.json({ token, userid: data[0]._id, watchedMovies:data[0].watchedMovies, recommendedMovies:data[0].recommendedMovies}).status(200)
      }
      return res.json({ login: "false" }).status(401);
    })
    .catch((err) => {
      console.log("error is :" + err.message);
      return res.json({ login: "false" }).status(401);
    });
})

authRouter.post('/signup', async (req,res)=>{
    try {
        const {name,email,password}=req.body
        await new User({name,email,password}).save().then((data)=>{
            const token = jwt.sign({
                _id: data._id
            }, process.env.JWTKEY, { expiresIn: '1h' });
            return res.json({ token, userid: data._id, watchedMovies:data.watchedMovies, recommendedMovies:data.recommendedMovies}).status(201)
        }) 
    } catch (error) {
        console.log(error)
        res.json({'created':'false'})
    }
})

module.exports = authRouter