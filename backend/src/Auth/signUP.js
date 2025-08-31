import mongoose from "mongoose";
import User from "../models/signUpModel.js";
import bcrypt from "bcrypt"
import {genrateToken} from '../utils/token.js'
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
        const token = genrateToken(newUser)
        res.status(200).json({message:"sign up successfull",success:true , token:token ,userName:newUser.name})
    }catch(err){
        console.error("error while signUp in the backend",err);
        res.status(500).json({message:"Can't signup!"})
        
    }
  
}
