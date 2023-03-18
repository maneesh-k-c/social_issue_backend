const express = require('express')
const AdminRouter = express.Router()
const register = require('../models/userData')
const login = require('../models/loginData')
var objectId = require('mongodb').ObjectID;

AdminRouter.use(express.static('./public'))

AdminRouter.get("/", async (req, res) => {
    res.render('dashboard')
});
AdminRouter.get("/view-users", async (req, res) => {
    try{
         login.aggregate([
            {
              '$lookup': {
                'from': 'user_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'data'
              }
            },
            {
                "$unwind": "$data"
            },
            {
                "$group": {
                    "_id": "$_id",
                    "name": { "$first": "$data.name" },
                    "address": { "$first": "$data.address" },
                    "phone": { "$first": "$data.phone" },
                    "status": { "$first": "$status" }        
                }
            }
        
          ]).then((user)=>{
            res.render('all-user',{user})
         })       
    }catch(err){

    }
   
});

AdminRouter.get("/approve/:id", async (req, res) => {
    const id = req.params.id
   login.updateOne({_id:id},{$set:{status:1}}).then((details)=>{
res.redirect('/admin/view-users')
   })
    
});








module.exports = AdminRouter
