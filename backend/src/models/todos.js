import mongoose from "mongoose";


const todosSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true,"Enter something"]
    },
  completed:{type:Boolean , default:false}
  ,
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

},{timestamps:true})

const Todo = mongoose.model("Todo" , todosSchema)

export default Todo