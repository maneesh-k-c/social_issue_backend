const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const DepartmentSchema = new Schema({
    login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    department_name:{ type: String, required: true },
    address:{ type: String, required: true },
    phone:{ type: String, required: true },
    email:{ type: String, required: true },
    description:{ type: String, required: true }

})
var Departmentdata = mongoose.model('department_tb',DepartmentSchema)
module.exports=Departmentdata;