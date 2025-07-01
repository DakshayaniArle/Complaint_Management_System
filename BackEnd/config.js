const  mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("connected successfully to mongoDB");
  })
  .catch((error)=>{
    console.log("connection error",error);
  })