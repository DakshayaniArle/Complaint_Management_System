const express = require("express");
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
 const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: String,
  email: String,
  phone: String,
  address: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', default: null },
  messages: [
    {
      text: String,
      from: String, // "user" or "agent"
      timestamp: { type: Date, default: Date.now },
    }
  ],
});

module.exports = mongoose.model('Complaint', complaintSchema);

///////////// Agent Schema //////////////////////////////////

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
});

module.exports = mongoose.model('Agent', agentSchema);

module.exports = {userModel}
