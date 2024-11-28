const user= require('../models/users')

async function userSignupHandler(req,res){
    const {fullName,email,password}= req.body;

    await user.create({
        fullName,email,password
    })

    return res.redirect('/')
}

async function userSigninHandler(req,res){
    const {email,password}=req.body;

    const User = await user.matchPassword(email,password)

    console.log(User)

    return res.redirect('/')

}

async function handleGetSignupPage(req,res){
    res.render('signup')
}

async function handleGetSigninPage(req,res){
    res.render('signin')
}



module.exports={userSignupHandler,handleGetSignupPage,handleGetSigninPage,userSigninHandler}