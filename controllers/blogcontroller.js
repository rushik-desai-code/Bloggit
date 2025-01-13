const blog= require('../models/blog')

async function addNewBlogHandler(req,res){
    res.render('addBlog.ejs',{
        user:req.user,
    });
}

async function saveBlogHandler(req,res){
    const{title,body}=req.body
    const Blog=await blog.create({
        title:title,
        body:body,
        createdBy:req.user._id,
        coverImageURL:`uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${Blog._id}`)
}

module.exports={addNewBlogHandler,saveBlogHandler}