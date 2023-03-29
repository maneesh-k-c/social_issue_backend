const express = require('express')
const TaskRouter = express.Router()
const task = require('../models/taskData');

TaskRouter.post("/add-task", async (req, res) => {
    try {
        var details = {
            worker_id: req.body.worker_id,
            department_id: req.body.department_id,
            task_name: req.body.task_name,
            date: req.body.date,
            description: req.body.description,
            status: "Assigned"
        }
        const result = await task(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Task added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);


module.exports = TaskRouter