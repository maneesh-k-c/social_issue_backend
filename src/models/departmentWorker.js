const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const DepartmentWorkerSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     department_id:{ type: Schema.Types.ObjectId, ref: "department_tb", required: true },
     name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: String, required: true },
     

})
var DepartmentWorkerdata = mongoose.model('department_worker_tb',DepartmentWorkerSchema)
module.exports=DepartmentWorkerdata;