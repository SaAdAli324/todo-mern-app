import mongoose from "mongoose";
import User from "../models/signUpModel.js";
import bcrypt from 'bcrypt'
import { genrateToken } from "../utils/token.js";

export const logIn =async (req , res) => {
  try{
    const {email , password}= req.body



    const exisingUser =await User.findOne({email}).select("+_id").select("+name")

    
    if (!exisingUser) {
        return res.status(404).json({message:"Check Your Email or Password!", success:false})
    }

     const decryptPass = await bcrypt.compare( password , exisingUser.confirmPassword)
    

    if (!decryptPass) {
        return res.status(500).json({message:"Check Your Email or Password!" , success:false})
    }

    const token = genrateToken(exisingUser)

    res.status(200).json({message:"logIn successful !", success:true , token:token , userName:exisingUser.name})
  }catch(err){
    console.error("Error Occured While Login!",err);
    res.status(500).json({message:"Can't login try again!", success:false})
    
  }
}
