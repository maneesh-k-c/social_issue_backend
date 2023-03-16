const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema 
const LoginSchema = new Schema({
     username: String,
     password: String,
     status:String,
     role: String    
})

var Logindata = mongoose.model('login_tb',LoginSchema) 
module.exports=Logindata;