const express= require('express')
const mongoose= require('mongoose')
const path= require('path')
const userRoutes=require('./routes/user')
const blogRoutes=require('./routes/blog')
const { urlencoded } = require('body-parser')
const blog=require('./models/blog')
const cookieParser =require('cookie-parser')
const PORT = 8000
const {checkForAuthenticationCookie}=require('./middlewares/authentication')
const app=express()

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve('./public')))

mongoose.connect('mongodb://localhost:27017/blogify').then(e=>console.log('connected to mongodb'))
app.use(checkForAuthenticationCookie("token"))


app.get('/',async (req,res)=>{
    const allBlogs=await blog.find({});
    res.render('homepage',{
        user:req.user,
        blogs:allBlogs
    })
})

app.use('/user',userRoutes);
app.use('/blog',blogRoutes);

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))
