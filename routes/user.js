const {Router} = require('express')
const {userSignupHandler,handleGetSignupPage,handleGetSigninPage,userSigninHandler,userSignOutHandler}=require('../controllers/usercontrollers')

const router= Router()

router.get('/signup',handleGetSignupPage)

router.get('/signin',handleGetSigninPage)

router.post('/signup',userSignupHandler)

router.post('/signin',userSigninHandler)

router.get('/signout',userSignOutHandler)

module.exports=router