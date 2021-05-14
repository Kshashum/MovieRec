const mongoose = require("mongoose");
const initdb = async()=>{
  try{
    await mongoose.connect("mongodb://localhost/movieAPI", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(mongoose.connection.readyState);
  }
  catch(err){
    console.log(err)
  }
}
module.exports = initdb