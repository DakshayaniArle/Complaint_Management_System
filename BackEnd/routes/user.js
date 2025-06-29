const express = require("express");
const router = express.Router();

router.post("/signup",(req,res)=>{
    console.log("Sign up data:",req.body);
    res.status(200).json({message:"SignUp successful"});
})

router.post("/login",(req,res)=>{
    console.log("Logged in data:",req.body);
    res.status(200).json({message:"Logged in Successfully"});
})

module.exports = router;