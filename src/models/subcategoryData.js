const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/SocialIssueDB?retryWrites=true&w=majority')  
const Schema = mongoose.Schema
const SubCategorySchema = new Schema({
     category_id:{ type: mongoose.Types.ObjectId,ref:"category_tb" },
     sub_category_name:{ type: String },
    })
var subcategorydata = mongoose.model('sub_category_tb',SubCategorySchema)
module.exports=subcategorydata;