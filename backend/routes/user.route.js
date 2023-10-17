const express=require("express");

const userRoute=express.Router();

const bcrypt=require("bcrypt");

const {userModel}=require("../model/user.model");

userRoute.post("/signup",async(req,res)=>{
  
    const { username, email, password } = req.body;
    const check = await userModel.find({ email });
    if (check.length > 0) {
      return res.status(200).json({ "ok": false, "msg": "User already exist" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      try {
        if(err){
          res.send(err.message)
        }else{
          const data = new userModel({ username, email, password: hash });
          await data.save();
          res.status(200).json({ "ok": true, "msg": "Registered Successfully" });
        }
      } catch (error) {
        res.status(400).json({ "ok": false, "msg": error.message });
      }
  
    });

})

module.exports={
     userRoute
}