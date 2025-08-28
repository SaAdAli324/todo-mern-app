import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true  , "Enter your Name!"]
    },
    email:{
        type:String,
        required:[true , "Email is required!"],
        unique:[true , "Email Already Exists"]
    },
    confirmPassword:{
        type:String,
        required:[true , "Confirm Your Password"]
    }
    
},{timestamps:true})

const User = mongoose.model("User" , signUpSchema)

export default User