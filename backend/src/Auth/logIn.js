import mongoose from "mongoose";
import User from "../models/signUpModel.js";
import bcrypt from 'bcrypt'
export const logIn =async (req , res) => {
  try{
    const {email , password}= req.body



    const exisingUser =await User.findOne({email}).select("+password").select("+_id")

    console.log(exisingUser._id);
    
   
    
    if (!exisingUser) {
        return res.status(404).json({message:"Check Your Email or Password!", success:false})
    }

     const decryptPass = await bcrypt.compare( password , exisingUser.confirmPassword)
    console.log(decryptPass);
    

    if (!decryptPass) {
        return res.status(500).json({message:"Check Your Email or Password!" , success:false})
    }

    res.status(200).json({message:"logIn successful !", success:true , userId:exisingUser._id})
  }catch(err){
    console.error("Error Occured While Login!",err);
    res.status(500).json({message:"Can't login try again!", success:false})
    
  }
}
