const express = require("express");
const mongoose = require("mongoose");

//////////////// User Schema ////////////////////////////
const userSchema = mongoose.Schema({
    name:{type:String , required:"Name is required"},
    email:{type:String , required:"email is required"},
    userType:{type:String,required:"userType is required"},
    password:{type:String,required:"password is required"},
    phone:{type:String,required:"Phone number is required"},
},
{
    timestamps:true
});

// User Model
 const userModel = mongoose.model("usersData",userSchema);

 ////////////// Complaint Schema ///////////////////////////////
 const complaintSchema = mongoose.Schema({
    
 })



