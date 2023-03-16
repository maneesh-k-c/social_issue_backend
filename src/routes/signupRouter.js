const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs')
const register = require('../models/userData')
const login = require('../models/loginData')
const company = require('../models/companyData')
const deparment = require('../models/departmentData')

// company role : 1
// user role : 2
// department role : 3

RegisterRouter.post("/user", async (req, res) => {   
    try {
      const oldUser = await login.findOne({ username:req.body.username });  
      if (oldUser) {
        return res.status(400).json({ success:false, error:true, message: "User already exists" });
      }  
      const hashedPassword = await bcrypt.hash(req.body.password, 12);   
      const oldphone = await register.findOne({ phone:req.body.phone }); 
      if (oldphone) {
        return res.status(400).json({ success:false, error:true, message: "Phone number already exists" });
      } 
      const oldemail = await register.findOne({ email:req.body.email });  
      if (oldemail) {
        return res.status(400).json({ success:false, error:true, message: "Email id already exists" });
      } 
      var log = {  username:req.body.username, password:hashedPassword, role:2  }
      const result = await login(log).save()
      var reg = {login_id:result._id, name:req.body.name, address:req.body.address, phone:req.body.phone, email:req.body.email}
      const result2 = await register(reg).save()
      if(result2){
        res.status(201).json({ success:true, error:false, message:"Registration completed", details:result2});
      }
      
    } catch (error) {
      res.status(500).json({ success:false, error:true, message: "Something went wrong" });
      console.log(error);
    }
  }
);

RegisterRouter.post("/company", async (req, res) => {   
  try {
    const oldUser = await login.findOne({ username:req.body.username });  
    if (oldUser) {
      return res.status(400).json({ success:false, error:true, message: "User already exists" });
    }  
    const hashedPassword = await bcrypt.hash(req.body.password, 12);   
    const oldphone = await company.findOne({ phone:req.body.phone }); 
    if (oldphone) {
      return res.status(400).json({ success:false, error:true, message: "Phone number already exists" });
    } 
    const oldemail = await company.findOne({ email:req.body.email });  
    if (oldemail) {
      return res.status(400).json({ success:false, error:true, message: "Email id already exists" });
    } 
    var log = {  username:req.body.username, password:hashedPassword, role:1  }
    const result = await login(log).save()
    var reg = {login_id:result._id, company_name:req.body.company_name, address:req.body.address, phone:req.body.phone, email:req.body.email}
    const result2 = await company(reg).save()
    if(result2){
      res.status(201).json({ success:true, error:false, message:"Company Registration completed", details:result2});
    }
    
  } catch (error) {
    res.status(500).json({ success:false, error:true, message: "Something went wrong" });
    console.log(error);
  }
}
);

RegisterRouter.post("/department", async (req, res) => {   
  try {
    const oldUser = await login.findOne({ username:req.body.username });  
    if (oldUser) {
      return res.status(400).json({ success:false, error:true, message: "User already exists" });
    }  
    const hashedPassword = await bcrypt.hash(req.body.password, 12);   
    const oldphone = await deparment.findOne({ phone:req.body.phone }); 
    if (oldphone) {
      return res.status(400).json({ success:false, error:true, message: "Phone number already exists" });
    } 
    const oldemail = await deparment.findOne({ email:req.body.email });  
    if (oldemail) {
      return res.status(400).json({ success:false, error:true, message: "Email id already exists" });
    } 
    var log = {  username:req.body.username, password:hashedPassword, role:3  }
    const result = await login(log).save()
    var reg = {login_id:result._id, department_name:req.body.department_name, address:req.body.address, phone:req.body.phone, email:req.body.email, description:req.body.description}
    const result2 = await deparment(reg).save()
    if(result2){
      res.status(201).json({ success:true, error:false, message:"Department Registration completed", details:result2});
    }
    
  } catch (error) {
    res.status(500).json({ success:false, error:true, message: "Something went wrong" });
    console.log(error);
  }
}
);

RegisterRouter.get("/view-all-users", async (req, res) => {   
  try {
    const allData = await register.find();
    if (allData) {
      return res.status(200).json({ success:true, error:false, data: allData });
    }  
    else{
      res.status(201).json({ success:false, error:true, message:"No data found" });
    }    
    
  } catch (error) {
    res.status(500).json({ success:false, error:true, message: "Something went wrong" });
    console.log(error);
  }
}
);

RegisterRouter.get("/view-all-companies", async (req, res) => {        
  try {
    const allData = await company.find();
    if (allData) {
      return res.status(200).json({ success:true, error:false, data: allData });
    }  
    else{
      res.status(201).json({ success:false, error:true, message:"No data found" });
    }    
    
  } catch (error) {
    res.status(500).json({ success:false, error:true, message: "Something went wrong" });
    console.log(error);
  }
}
);

RegisterRouter.get("/view-all-dipartments", async (req, res) => {        
  try {
    const allData = await deparment.find();
    if (allData) {
      return res.status(200).json({ success:true, error:false, data: allData });
    }  
    else{
      res.status(201).json({ success:false, error:true, message:"No data found" });
    }    
    
  } catch (error) {
    res.status(500).json({ success:false, error:true, message: "Something went wrong" });
    console.log(error);
  }
}
);










module.exports = RegisterRouter