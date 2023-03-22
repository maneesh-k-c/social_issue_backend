const express = require('express')
const AdminRouter = express.Router()
const register = require('../models/userData')
const login = require('../models/loginData')
const company = require('../models/companyData')
const department = require('../models/departmentData')
var objectId = require('mongodb').ObjectID;

AdminRouter.use(express.static('./public'))

AdminRouter.get("/", async (req, res) => {
    res.render('dashboard')
});
AdminRouter.get("/view-users", async (req, res) => {
    try {
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

        ]).then((user) => {
            res.render('all-user', { user })
        })
    } catch (err) {

    }

});

AdminRouter.get("/approve/:id", async (req, res) => {
    const id = req.params.id
    login.findByIdAndUpdate({ _id: id }, { $set: { status: 1 } }).then((details) => {
        console.log("details==>", details);
        res.redirect('/admin/view-users')
    })

});

AdminRouter.get("/delete/:id", async (req, res) => {
    const id = req.params.id
    login.deleteOne({ _id: id }).then((details) => {
        // res.redirect('/admin/view-users')
        console.log("details==>",details.deletedCount);
       if(details.deletedCount===1){
        register.deleteOne({ login_id: id }).then((details) => {
            res.redirect('/admin/view-users')
        })
       }
    })

});

AdminRouter.get("/view-company", async (req, res) => {
    try {
        login.aggregate([
            {
                '$lookup': {
                    'from': 'company_tbs',
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
                    "company_name": { "$first": "$data.company_name" },
                    "address": { "$first": "$data.address" },
                    "phone": { "$first": "$data.phone" },
                    "status": { "$first": "$status" }
                }
            }

        ]).then((company) => {
            res.render('all-company', { company })
        })
    } catch (err) {

    }

});

AdminRouter.get("/approve_company/:id", async (req, res) => {
    const id = req.params.id
    console.log("id==>",id);
    login.findByIdAndUpdate({ _id: id }, { $set: { status: 1 } }).then((details) => {
        console.log("details==>", details);
        res.redirect('/admin/view-company')
    })

});

AdminRouter.get("/delete_company/:id", async (req, res) => {
    const id = req.params.id
    login.deleteOne({ _id: id }).then((details) => {
        // res.redirect('/admin/view-users')
        console.log("details==>",details.deletedCount);
       if(details.deletedCount===1){
        company.deleteOne({ login_id: id }).then((details) => {
            res.redirect('/admin/view-company')
        })
       }
    })

});

AdminRouter.get("/view-department", async (req, res) => {
    try {
        login.aggregate([
            {
                '$lookup': {
                    'from': 'department_tbs',
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
                    "department_name": { "$first": "$data.department_name" },
                    "address": { "$first": "$data.address" },
                    "phone": { "$first": "$data.phone" },
                    "description": { "$first": "$data.description" },
                    "status": { "$first": "$status" }
                }
            }

        ]).then((department) => {
            res.render('all-department', { department })
        })
    } catch (err) {

    }

});

AdminRouter.get("/approve_department/:id", async (req, res) => {
    const id = req.params.id
    console.log("id==>",id);
    login.findByIdAndUpdate({ _id: id }, { $set: { status: 1 } }).then((details) => {
        console.log("details==>", details);
        res.redirect('/admin/view-department')
    })

});

AdminRouter.get("/delete_department/:id", async (req, res) => {
    const id = req.params.id
    login.deleteOne({ _id: id }).then((details) => {
        console.log("details==>",details.deletedCount);
       if(details.deletedCount===1){
        department.deleteOne({ login_id: id }).then((details) => {
            res.redirect('/admin/view-department')
        })
       }
    })

});







module.exports = AdminRouter
