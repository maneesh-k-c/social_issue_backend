const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const TenderReplySchema = new Schema({
     company_id:{ type: Schema.Types.ObjectId, ref: "company_tb", required: true },
     tender_id:{ type: Schema.Types.ObjectId, ref: "tender_tb", required: true },
     status:{ type: String, required: true },
     amount:{ type: String, required: true }
    })
var Tenderreplydata = mongoose.model('tender_reply_tb',TenderReplySchema)
module.exports=Tenderreplydata;