const mongoose=require('mongoose')
const { schema } = require('./users')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogify',
    },

},{timestamps:true});


const Blog=mongoose.model('blog',blogSchema)

module.exports=Blog;