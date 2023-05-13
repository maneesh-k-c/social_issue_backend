const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const CategorySchema = new Schema({
     category_name:{ type: String },
     description:{ type: String },
    })
var categorydata = mongoose.model('category_tb',CategorySchema)
module.exports=categorydata;