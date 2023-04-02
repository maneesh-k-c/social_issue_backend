const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const AssignTenderSchema = new Schema({
     company_id:{ type: Schema.Types.ObjectId, ref: "company_tb", required: true },
     tender_id:{ type: Schema.Types.ObjectId, ref: "tender_tb", required: true },
     worker_id:{ type: Schema.Types.ObjectId, ref: "worker_tb", required: true },
     status:{ type: String, required: true },
    })
var AssignTenderdata = mongoose.model('assign_tender_tb',AssignTenderSchema)
module.exports=AssignTenderdata;