const express = require('express')
const signinRouter = express.Router()
const bcrypt = require('bcryptjs')
const register = require('../models/userData')
const login = require('../models/loginData')
const jwt = require('jsonwebtoken')


signinRouter.post("/",async(req,res)=>{
  const {username,password}=req.body;
  console.log(username);
  
  try{
      const oldUser=await login.findOne({username})
      if(!oldUser) return res.status(404).json({success:false,error:true,message:"User doesn't Exist"})
      const isPasswordCorrect=await bcrypt.compare(password,oldUser.password)
      console.log("user",isPasswordCorrect);

      if(!isPasswordCorrect) return res.status(400).json({success:false,error:true,message:"Incorrect password"})
      const token=jwt.sign({login_id:oldUser._id,username:oldUser.username,role:oldUser.role},"secret",
          {expiresIn:"1h"})
          console.log("token",token);
         return res.status(200).json({
            success:true,
            error:false,
            role:oldUser.role,
            token
        })
  }catch(error){
      res.status(500).json({message:"Something went wrong"})
      }
})
module.exports = signinRouter