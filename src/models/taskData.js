const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const TaskSchema = new Schema({
     worker_id:{ type: Schema.Types.ObjectId, ref: "department_worker_tb", required: true },
     department_id:{ type: Schema.Types.ObjectId, ref: "department_tb", required: true },
     tender_name:{ type: String, required: true },
     job_start_date:{ type: String, required: true },
     job_end_date:{ type: String, required: true },
     status:{ type: String, required: true },
     description:{ type: String, required: true }
    })
var Taskdata = mongoose.model('task_tb',TaskSchema)
module.exports=Taskdata;