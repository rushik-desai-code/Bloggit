const user= require('../models/users')

async function userSignupHandler(req,res){
    const {fullName,email,password}= req.body;

    try{
        const token=await user.createUserandGenerateToken(fullName,email,password)
        return res.cookie('token',token).redirect('/');
    }catch(error){
        return res.render('signup',{
            error:'Trouble while creating user'
        })
    }

    return res.redirect('/')
}

async function userSigninHandler(req,res){
    const {email,password}=req.body;
    try {
        const token = await user.matchPasswordandGenerateToken(email,password)

        return res.cookie("token",token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:'Incorrect email or password'
        })
    }
}

async function handleGetSignupPage(req,res){
    res.render('signup')
}

async function handleGetSigninPage(req,res){
    res.render('signin')
}

async function userSignOutHandler(req,res){
    res.clearCookie('token').redirect('/user/signin')
}



module.exports={userSignupHandler,handleGetSignupPage,handleGetSigninPage,userSigninHandler,userSignOutHandler}