const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("./config");
const {userModel , complaintModel} = require("./Schema");

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

//configure multer
const storage = multer.diskStorage({
    destination:"uploads/",
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now + "-"+file.originalname;
        cb(null,uniqueSuffix);
    }
})

const upload = multer({storage})

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"resolvenow.helpdesk@gmail.com",
        pass:"noqu nrgm rgdg mtam",
    }
})

////////////////SignUp of user////////////
app.post("/SignUp",async (req,res)=>{
    const { name, email, password, usertype } = req.body;

    try {
    // ✅ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }else{

    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();

    const mailOptions = {
        from:"resolvenow.helpdesk@gamil.com",
        to:email,
        subject:"Welcome to ResolveNow",
        text: `Hi ${name},\n\nThanks for registering as ${usertype}.\n\nWe're excited to have you!\n\n— The ResolveNow Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({message: "Signup successful! Email sent.", user: savedUser })
}
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Server error. Please try again." });
    }
})

//////////////user login//////////////////
app.post("/login",async (req,res)=>{
    const {email , password} = req.body;
    // console.log(req.body);
    try{
    const loggedUser = await userModel.findOne({email});
    if(!loggedUser){
       return res.status(404).json({message:"User Not found"});
    }
    else{
        if(loggedUser.email=== email && password ===loggedUser.password){
            res.status(200).json({
                message:"Login successful",
                email:loggedUser.email,
                usertype:loggedUser.usertype,
            });
        }else{
            res.status(401).json({message:"Invalid credentials"})
        }
    }
   }catch(err){
    console.error("Login error:",err);
    res.status(500).json({message:"server error"});
   }
})

////////////////////////user complaint///////////
app.post("/complaints",upload.array("attachments",5),async(req,res)=>{
    try{
        const { userId, name, email, phone, address, title, description } = req.body;
        const filePaths = req.files.map((file) => file.path);

         const complaint = new Complaint({
      userId,
      name,
      email,
      phone,
      address,
      title,
      description,
      attachments: filePaths,
    });

    const savedComplaint = await complaint.save();
    res.status(201).json({ message: "Complaint submitted", savedComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})



app.listen(5000,()=>{
    console.log("server is running at localhost 5000..........");
})

