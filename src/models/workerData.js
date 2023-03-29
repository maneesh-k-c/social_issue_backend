const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const WorkerSchema = new Schema({
     company_id:{ type: Schema.Types.ObjectId, ref: "company_tb", required: true },
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: String, required: true },
     

})
var Workerdata = mongoose.model('worker_tb',WorkerSchema)
module.exports=Workerdata;