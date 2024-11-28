const express= require('express')
const mongoose= require('mongoose')
const path= require('path')
const userRoutes=require('./routes/user')
const { urlencoded } = require('body-parser')
const PORT = 8000

const app=express()

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost:27017/blogify').then(e=>console.log('connected to mongodb'))

app.get('/',(req,res)=>{
    res.render('homepage')
})

app.use('/user',userRoutes)

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))
