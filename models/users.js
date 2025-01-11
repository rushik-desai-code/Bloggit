const mongoose =require('mongoose')
const {createHmac,randomBytes} =require("crypto")
const {createTokenForUser,verifyToken}=require('../Services/authentication')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    salt:{
        type: String,
 
    },
    password:{
        type: String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'public/images/user_image.png'
    },
    role:{
        type:String,
        enum: ['USER','ADMIN'],
        default:'USER'
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt= randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest('hex');
    
    this.salt=salt;
    this.password=hashedPassword;

    next();

})

userSchema.static('createUserandGenerateToken', async function(fullName,email,password){
    const user=await this.create({fullName,email,password})
    const token=createTokenForUser(user)
    return token;

})

userSchema.static('matchPasswordandGenerateToken',async function(email,password){
    const user=await this.findOne({email})

    if (!user) throw new Error('User not found!');

    const salt=user.salt
    const hashedPassword=user.password

    const userProvidedHash = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedPassword!=userProvidedHash) throw new Error('incorrect password!')

    const token=createTokenForUser(user)
    return token;
})

const User =mongoose.model("blogify",userSchema)

module.exports=User