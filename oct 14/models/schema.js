const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// it will create new instance of the schema object
const nodeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }

},{timestamps:true})

const Blog = mongoose.model('Blog',nodeSchema)
module.exports = Blog