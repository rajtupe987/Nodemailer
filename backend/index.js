const express=require("express");

const {connection}=require("./config/db");
const {userRoute}=require("./routes/user.route");


require("dotenv").config()
const app=express();

app.use(express.json())
app.get("/",(req,res)=>{
    try {
        res.send("Welcome to mailernode")
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

app.use("/api",userRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("db connected to server.")
    } catch (error) {
        console.log(error)
    }
})