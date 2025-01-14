const blog= require('../models/blog')
const comment=require('../models/comment')

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

async function renderBlogHandler(req,res){
    const Blog=await blog.findById(req.params.id).populate('createdBy');
    const comments=await comment.find({blogId:req.params.id}).populate('createdBy')
    return res.render('blog.ejs',{
        user:req.user,
        Blog,
        comments
    });
}

async function postCommentHandler(req,res){
    await comment.create({
        Content:req.body.Content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports={addNewBlogHandler,saveBlogHandler,renderBlogHandler,postCommentHandler}