const express = require('express')
const TaskRouter = express.Router()
const task = require('../models/taskData');

TaskRouter.post("/add-task", async (req, res) => {
    try {
        var details = { worker_id: req.body.worker_id, 
                     department_id: req.body.department_id, complaint_title: req.body.complaint_title, 
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


module.exports = TaskRouter