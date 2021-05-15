const authRouter = require("express").Router();
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');

//login route, if credentials match return a token 
authRouter.get('/login', async (req,res)=>{
    const {email,password}=req.query
    const data = await User.find({email:email}).then((data) => {return data}).catch((err) => {
        console.log("error is :" + err.message);})
    console.log(data)
    const val = await bcrypt.compare(password,data[0].password)
    if(val){
            const token = jwt.sign({
                _id: data[0]._id
            }, process.env.JWTKEY, { expiresIn: '1h' });
            return res.json({ token, userid: data[0]._id, watchedMovies:data[0].watchedMovies, recommendedMovies:data[0].recommendedMovies}).status(200)
        }
    else{
        return res.json({ login: "false" }).status(401);
    }
    })

// signup route, add the user to the database, after hashing the password and return a token
authRouter.post('/signup', async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const hash = await bcrypt.hash(password,10)
        await new User({name,email,password:hash}).save().then((data)=>{
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