const  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Complaint_Management_System")
  .then(()=>{
    console.log("connected successfully to mongoDB");
  })
  .catch(()=>{
    console.log("connection error");
  })