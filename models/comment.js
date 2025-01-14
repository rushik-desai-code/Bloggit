const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    Content:{
        type:String,
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogify'
    },

},{timestamps:true})

const Comment=mongoose.model('comment',commentSchema);

module.exports=Comment