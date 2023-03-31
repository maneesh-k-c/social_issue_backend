const express = require('express')
const ComplaintRouter = express.Router()
const bcrypt = require('bcryptjs');
const Complaint = require('../models/complaintData');
const multer = require("multer")
var objectId = require('mongodb').ObjectID;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../images/complaints")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

var upload = multer({ storage: storage })

ComplaintRouter.post('/upload-image', upload.single("file"), (req, res) => {
    return res.json("file uploaded")
})

ComplaintRouter.post("/add-complaint", async (req, res) => {
    try {
        var details = { login_id: req.body.login_id, department_id: req.body.department_id, complaint_title: req.body.complaint_title, 
                        description: req.body.description, image: req.body.image, location: req.body.location}
        const result = await Complaint(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Complaint added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.get("/view-all-complaints", async (req, res) => {
    try {
        const allData = await Complaint.find();
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.post("/reply-complaints/:id", async (req, res) => {
    const id = req.params.id
    try {

        const allData = await Complaint.updateOne({_id:id},{$set:{reply:req.body.reply}});
        if (allData) {
            return res.status(200).json({ success: true, error: false, message:"Reply added" });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);






module.exports = ComplaintRouter