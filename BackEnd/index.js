const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user",userRoutes);

app.listen(5000,()=>{
    console.log("server is running at localhost 5000..........");
})