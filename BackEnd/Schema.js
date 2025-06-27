const mongoose = require("mongoose");

//////////////// User Schema ////////////////////////////
const userSchema = mongoose.Schema({
    name:{type:String , required:"Name is required"},
    email:{type:String , required:"email is required"},
    usertype:{type:String,required:"userType is required"},
    password:{type:String,required:"password is required"},
},
{
    timestamps:true
});

// User Model
 const userModel = mongoose.model("usersData",userSchema,"usersData");

 ////////////// Complaint Schema ///////////////////////////////



module.exports = {userModel , complaintModel}
