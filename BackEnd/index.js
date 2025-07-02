const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("./config");
const {userModel , complaintModel, assignModel} = require("./Schema");

app.use(cors({
  origin:['http://localhost:5173', 'https://complaint-management-system-five.vercel.app'],
  credentials:true
}));
app.use(express.json());
app.use("/uploads",express.static("uploads"));

//configure multer
const storage = multer.diskStorage({
    destination:"uploads/",
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + "-"+file.originalname;
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
            res.status(200).json(loggedUser);
        }else{
            res.status(401).json({message:"Invalid credentials"})
        }
    }
   }catch(err){
    console.error("Login error:",err);
    res.status(500).json({message:"server error"});
   }
})

//////////////////////// to store user complaint///////////
app.post("/complaints",upload.array("attachments",5),async(req,res)=>{
    // console.log(req.body);
    try{
        const { userId, name, email, phone, address, title, description } = req.body;
        const filePaths = req.files.map((file) => file.path);

         const complaint = new complaintModel({
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

////////to0 display complaint of user based on id////////
app.get("/complaints/:id", async (req,res)=>{
    try{
         const userId = req.params.id;
         const complaints = await complaintModel.find({userId : userId});
         res.status(200).json(complaints);
    }catch(err){
        console.error("Error fetching complaints:",err);
        res.status(500).json({err:"failed to fetch complaints"});
    }
   
})

///////////to dsiplay all the complaints to the admin\\\\\\
app.get("/admin/complaints",async (req,res)=>{
    try{
        const allComplaints = await complaintModel.find({});
        res.status(200).json(allComplaints);
    }catch(err){
        console.error("error while fetching comaplints",err);
        res.status(500).json("error while fetching comaplints");
    }
})

///////////to display all the agents to the admin\\\\\
app.get("/admin/agents",async (req,res)=>{
    try{
        const allAgents = await userModel.find({usertype:"agent"});
        res.status(200).json(allAgents);
    }catch(err){
        console.error("error while fetching agents",err);
        res.status(500).json("error while fetching agents")
    }
})
////////////assign compliants to agents//////
app.post("/assign",async (req,res)=>{
    // console.log(req.body);
    try{
        const{agentId,complaintId,status,assignedAt} = req.body;

        const agent = await userModel.findOne({_id:agentId});
        // console.l;og(agent);
        const assignment = new assignModel({
            agentId,
            complaintId,
            status,
            agent:agent.name,
            assignedAt,
        })
        const newAssignment = await assignment.save();
        res.status(200).json(agent);
    }catch(err){
        console.error("assignment failed",err);
        res.status(500).json({message:"assignment failed"})
    }
    
})

/////////////////to get all the complaints assigened/////////
app.get("/assignments", async (req, res) => {
  try {
    const assignments = await assignModel.find(); 
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
});

//////////////complaints of an agent////////
app.get("/agent/:id/complaints", async (req, res) => {
  const agentId = req.params.id;
  try {
    const complaints = await assignModel
      .find({ agentId })
      .populate("complaintId");
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assigned complaints" });
  }
});

/////////////chnage status based on id //////////////////
app.patch("/assign/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Step 1: Update in assignModel
    const assignment = await assignModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    // Step 2: Also update in complaintModel

    const complaint =   await complaintModel.findByIdAndUpdate(assignment.complaintId, { status },{new:true});
    

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Step 3: Send Email to the user
    const mailOptions = {
      from: "resolvenow.helpdesk@gamil.com",
      to: complaint.email,
      subject: `Your complaint status has been updated`,
      text: `Hi ${complaint.name},\n\nYour complaint titled "${complaint.title}" is now marked as "${status}".\n\nThank you for using ResolveNow.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Status updated and Email sent", status });
  } catch (error) {
    console.error("Error updating status or sending mail:", error);
    res.status(500).json({ error: "Failed to update status or sending mail" });
  }
});

////////Get number of complaints assigned to a specific agent///
app.get("/admin/agents/:id/complaint-count", async (req, res) => {
  try {
    const agentId = req.params.id;
    const count = await assignModel.countDocuments({ agentId });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch count" });
  }
});



app.listen(5000,()=>{
    console.log("server is running at localhost 5000..........");
})

