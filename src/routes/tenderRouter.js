const express = require('express')
const TenderRouter = express.Router()
const bcrypt = require('bcryptjs');
const Workerdata = require('../models/workerData');
const departmentWorkerdata = require('../models/departmentWorker')
const tender = require('../models/tenderData')




TenderRouter.post("/add-tender", async (req, res) => {
    try {
        const oldTender = await tender.findOne({ tender_name: req.body.tender_name });
        if (oldTender) {
            return res.status(400).json({ success: false, error: true, message: "Tender already exists" });
        }
        var details = { company_id: req.body.company_id, department_id: req.body.department_id, tender_name: req.body.tender_name, job_start_date: req.body.job_start_date, job_end_date: req.body.job_end_date, status: 0, description: req.body.description }
        const result = await tender(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Tender Added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);



TenderRouter.get("/view-all-workers/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await Workerdata.find({ company_id: id });
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


TenderRouter.get("/view-single-worker/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await Workerdata.findOne({ _id: id });
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

TenderRouter.get("/delete-single-worker/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await Workerdata.deleteOne({ _id: id });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Worker Deleted" });
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

TenderRouter.post("/update-single-worker/:id", async (req, res) => {
    try {
        const id = req.params.id
        var details = { name: req.body.name, address: req.body.address, phone: req.body.phone }
        const allData = await Workerdata.updateOne({ _id: id }, { $set: details });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Worker Details Updated" });
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












module.exports = TenderRouter