const express = require('express')
const AdminRouter = express.Router()
const register = require('../models/userData')
const login = require('../models/loginData')
const company = require('../models/companyData')
const department = require('../models/departmentData')
const complaint = require('../models/complaintData')
const categorydata = require('../models/categoryData')

var objectId = require('mongodb').ObjectID;

AdminRouter.use(express.static('./public'))

AdminRouter.get("/add-category", async (req, res) => {
    res.render('add-category')
});
AdminRouter.get("/add-sub-category", async (req, res) => {
    try {
        const category = await categorydata.find()
        console.log(category);
        res.render('add-sub-category',{category})
    } catch (error) {
        
    }

});

AdminRouter.get("/view-category", async (req, res) => {
    try {
        const category = await categorydata.find()
        console.log(category);
        res.render('view-category',{category})
    } catch (error) {
        
    }
   
});

AdminRouter.get("/save-category", async (req, res) => {
    try {
        const data = await categorydata.create({category_name:req.query.category_name,description:req.query.description})
        if(data){
            res.redirect('/admin/view-category')
        }
        
    } catch (error) {
        
    }
    
});

AdminRouter.get("/delete_category/:id", async (req, res) => {
    const id = req.params.id
    categorydata.deleteOne({ _id: id }).then((details) => {
        res.redirect('/admin/view-category')       
    })

});


AdminRouter.get("/", async (req, res) => {
    res.render('login')
});

AdminRouter.get('/logout',(req,res)=>{
    res.render('login')
})

AdminRouter.get("/index", async (req, res) => {
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

AdminRouter.get("/view-complaint", async (req, res) => {
    try {
        complaint.aggregate([
            {
                '$lookup': {
                    'from': 'user_tbs',
                    'localField': 'login_id',
                    'foreignField': 'login_id',
                    'as': 'data'
                }
            },
            {
                '$lookup': {
                    'from': 'department_tbs',
                    'localField': 'department_id',
                    'foreignField': '_id',
                    'as': 'department'
                }
            },
            {
                "$unwind": "$data"
            },
            {
                "$unwind": "$department"
            },
            {
                "$group": {
                    "_id": "$_id",
                    "name": { "$first": "$data.name" },
                    "phone": { "$first": "$data.phone" },
                    "department_name": { "$first": "$department.department_name" },
                    "complaint_title": { "$first": "$complaint_title" },
                    "description": { "$first": "$description" },
                }
            }

        ]).then((complaint) => {
            
            res.render('all-complaints', { complaint })
        })
    } catch (err) {

    }

});









module.exports = AdminRouter
