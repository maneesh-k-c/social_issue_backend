const express = require('express')
const WorkerRouter = express.Router()
const bcrypt = require('bcryptjs');
const Workerdata = require('../models/workerData');
const departmentWorkerdata = require('../models/departmentWorker')
const login = require('../models/loginData')




WorkerRouter.post("/", async (req, res) => {
    try {
        const oldPhone = await Workerdata.findOne({ phone: req.body.phone });
        if (oldPhone) {
            return res.status(400).json({ success: false, error: true, message: "Phone Number already exists" });
        }
        var details = { company_id: req.body.company_id, name: req.body.name, address: req.body.address, phone: req.body.phone }
        const result = await Workerdata(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Worker Registration completed", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

WorkerRouter.post("/department-worker", async (req, res) => {
    try {
      const oldUser = await login.findOne({ username: req.body.username });
      if (oldUser) {
        return res.status(400).json({ success: false, error: true, message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const oldphone = await departmentWorkerdata.findOne({ phone: req.body.phone });
      if (oldphone) {
        return res.status(400).json({ success: false, error: true, message: "Phone number already exists" });
      }
      var log = { username: req.body.username, password: hashedPassword, role: 4, status: 1 }
      const result = await login(log).save()
      var reg = { login_id: result._id, department_id:req.body.department_id, name: req.body.name, address: req.body.address, phone: req.body.phone }
      const result2 = await departmentWorkerdata(reg).save()
      if (result2) {
        res.status(201).json({ success: true, error: false, message: "Registration completed", details: result2 });
      }
  
    } catch (error) {
      res.status(500).json({ success: false, error: true, message: "Something went wrong" });
      console.log(error);
    }
  }
  );

WorkerRouter.get("/department-view-all-workers/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await departmentWorkerdata.find({ department_id: id });
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

WorkerRouter.get("/view-all-workers/:id", async (req, res) => {
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

WorkerRouter.get("/view-single-department-worker/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await departmentWorkerdata.findOne({ _id: id });
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

WorkerRouter.get("/delete-single-department-worker/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allData = await departmentWorkerdata.deleteOne({ _id: id });
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

WorkerRouter.get("/view-single-worker/:id", async (req, res) => {
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

WorkerRouter.get("/delete-single-worker/:id", async (req, res) => {
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

WorkerRouter.post("/update-single-worker/:id", async (req, res) => {
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












module.exports = WorkerRouter