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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},  
    title:{type:String,required:true},
    description:{type:String,required:true},
    attachments:[String],
    status:{type:String,default:"pending"},
    createdAt:{type:String,default:Date.now},
 })

 const complaintModel = mongoose.model("complaintsData",complaintSchema,"complaintsData");

 const assignSchema =  mongoose.Schema({
    agentId : {type: mongoose.Schema.Types.ObjectId, required: true, ref:"usersData"},
    complaintId:{type: mongoose.Schema.Types.ObjectId, required: true, ref:"complaintsData"},
    status:{type:String,required:true},
    agent:{type:String,required:true},
    assignedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
 })

 const assignModel = mongoose.model("assignData",assignSchema,"assignData")


module.exports = {userModel , complaintModel,assignModel}
