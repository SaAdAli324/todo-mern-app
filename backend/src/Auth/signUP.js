import mongoose from "mongoose";
import User from "../models/signUpModel.js";
import bcrypt from "bcrypt"

export const signUP = async (req ,res) => {
    try{
        const {name , email , password , confirmPassword} = req.body
        
        if (!name || !email || !password || !confirmPassword) {
            return res.status(404).json({message:"feilds can't be empty"})
        }
        const UserEmail = await User.findOne({email})
        if (UserEmail) {
            return res.status(500).json({message:"Email already exist"})
        }
        if (password !== confirmPassword) {
            return res.status(500).json({message:"please confirm your password"})
        }
        const hashedPassword  = await bcrypt.hash(password , 10)
        const newUser = new User({name , email , confirmPassword:hashedPassword})
        await newUser.save()

        console.log(newUser._id);
        
        res.status(200).json({message:"sign up successfull",user:newUser , success:true , userId:newUser._id})
    }catch(err){
        console.error("error while signUp in the backend",err);
        res.status(500).json({message:"Can't signup!"})
        
    }
  
}
