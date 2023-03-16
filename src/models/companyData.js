const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const CompanySchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     company_name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: String, required: true },
     email:{ type: String, required: true },

})
var Companydata = mongoose.model('company_tb',CompanySchema)
module.exports=Companydata;