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
 const complaintSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},  
    title:{type:String,required:true},
    description:{type:String,required:true},
    attachment:[String],
    status:{type:String,default:"pending"},
    createdAt:{type:String,default:Date.now},
 })

 const complaintModel = mongoose.model("complaintsData",complaintSchema,"complaintsData");


module.exports = {userModel , complaintModel}
