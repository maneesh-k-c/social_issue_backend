const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const ComplaintSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     department_id:{ type: Schema.Types.ObjectId, ref: "department_tb", required: true },
     complaint_title:{ type: String, required: true },
     description:{ type: String, required: true },
     image:{ type: String, required: true },
     location:{ type: String, required: true },

})
var Complaintdata = mongoose.model('complaint_tb',ComplaintSchema)
module.exports=Complaintdata;