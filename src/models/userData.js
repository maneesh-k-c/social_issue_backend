const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const RegisterSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: String, required: true },
     email:{ type: String, required: true },

})
var Registerdata = mongoose.model('user_tb',RegisterSchema)
module.exports=Registerdata;