const express = require('express')
const TaskRouter = express.Router()
const task = require('../models/taskData');

TaskRouter.get("/department-view-completed-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.find({ department_id: id, status:1 });
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

TaskRouter.post("/update-worker-task/:task_id", async (req, res) => {
    try {
        const task_id = req.params.task_id
        
        const allData = await task.updateOne({ _id: task_id }, { $set: {  status: 1 } });
        if (allData.modifiedCount===1) {
           
            return res.status(200).json({ success: true, error: false, message: "Task Updated" });
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

TaskRouter.post("/add-task", async (req, res) => {
    try {
        var details = {
            worker_id: req.body.worker_id,
            department_id: req.body.department_id,
            task_name: req.body.task_name,
            date: req.body.date,
            description: req.body.description,
            status: 0
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

TaskRouter.post("/update-task/:task_id", async (req, res) => {
    try {
        const task_id = req.params.task_id
        
        const allData = await task.updateOne({ _id: task_id }, { $set: {  task_name: req.body.task_name,date: req.body.date, description: req.body.description } });
        if (allData.modifiedCount===1) {
           
            return res.status(200).json({ success: true, error: false, message: "Task Updated" });
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

TaskRouter.post("/view-single-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.findOne({ _id: id });
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

TaskRouter.get("/department-added-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.find({ department_id: id });
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

TaskRouter.get("/delete-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.deleteOne({ _id: id });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Task Deleted" });
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

TaskRouter.get("/worker-view-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.find({ worker_id: id });
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

TaskRouter.get("/update-task/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await task.updateOne({ _id: id }, { $set: {status:1} });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Task Updated" });
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

module.exports = TaskRouter