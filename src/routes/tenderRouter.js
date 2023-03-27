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



TenderRouter.get("/department-added-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.find({ department_id: id });
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

TenderRouter.get("/company-view-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.find({ company_id: id });
        if (allData[0]) {
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

TenderRouter.get("/view-single-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.findOne({ _id: id });
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

TenderRouter.get("/delete-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.deleteOne({ _id: id });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Tender Deleted" });
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

TenderRouter.post("/accept-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.updateOne({ _id: id }, { $set: {status:1} });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Tender Accepted" });
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

TenderRouter.post("/reject-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await tender.updateOne({ _id: id }, { $set: {status:0} });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Tender Rejected" });
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

TenderRouter.post("/update-single-tender/:id", async (req, res) => {
    try {
        const id = req.params.id
        var details = { company_id: req.body.company_id, department_id: req.body.department_id, tender_name: req.body.tender_name, job_start_date: req.body.job_start_date, job_end_date: req.body.job_end_date, status: req.body.status, description: req.body.description }
        const allData = await tender.updateOne({ _id: id }, { $set: details });
        if (allData) {
            return res.status(200).json({ success: true, error: false, message: "Tender Details Updated" });
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