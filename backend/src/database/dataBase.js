import mongoose from "mongoose";


const connectDB= async ()=>{
try{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
console.log("mongoDB connected successfully");

}catch(err){
    console.error("error while connecting to DB",err);
    
}

}
export default connectDB