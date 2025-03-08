import mongoose from 'mongoose';
import { createHmac, randomBytes } from 'node:crypto';
import { setUser, refreshToken } from '../service/authenticate.service.js';



// let's create schema for user or you can say table 

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"USER"
    },
    refreshToken:{
        type:String,
        default:null
    }
},{
    timestamps:true
})



// let's write some functionality to store encrypted password
// IMP Don't ever use arrow function whenever you dealing with this key word
userSchema.pre('save',async function(next){
    // get the user schema
    const user=this;
    // check if password is modified or not
    if(!user.isModified("password")){
        return
    }
    // generate salt
    const salt= randomBytes(16).toString().trim()
    // generate hash
    const hashAlgorithm= createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashAlgorithm;
    // next
    next()
})



// let's create function 
// IMP Don't ever use arrow function whenever you dealing with this key word
userSchema.static("matchPasswordGenerateToken",async function(email,password){
try {
        // get the user
        const user=await this.findOne({email:email})
        // check if user exist or not
        if(!user){
            throw new Error("User not found");
        }
        // check if password is correct or not
        const salt=user.salt;
        const hashAlgorithm=createHmac("sha256",salt).update(password).digest("hex");
        // check if password is correct or not
        if(hashAlgorithm!==user.password){
            throw new Error("Password is incorrect");
        }
        // generate token
        const token=await setUser(user);
        const refresh_token=await refreshToken(user);
        return {token,refresh_token};
} catch (error) {
    throw new Error(error.message);
}
})

userSchema.static("matchPassword",async function (email,password) {
    try {
        const user=await this.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        const salt=user.salt;
        const hashAlgorithm=createHmac("sha256",salt).update(password).digest("hex");
        if(hashAlgorithm!==user.password){
           return  false;
        }
        else{
            return true;
        }
    } catch (error) {
        throw new Error(error.message);

    }
})




// let's export the model 
const User=mongoose.model("User",userSchema);
export default User;