const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const TenderSchema = new Schema({
     company_id:{ type: Schema.Types.ObjectId, ref: "department_tb", required: true },
     tender_name:{ type: String, required: true },
     job_start_date:{ type: String, required: true },
     job_end_date:{ type: String, required: true },
     status:{ type: String, required: true },
     description:{ type: String, required: true }
    })
var Tenderdata = mongoose.model('tender_tb',TenderSchema)
module.exports=Tenderdata;