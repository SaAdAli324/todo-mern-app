import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/database/dataBase.js'
import todoRouter from './src/routes/todosRoutes.js'
import signUpRouter from './src/routes/signUpRoute.js'
import logInRouter from './src/routes/logInRoute.js'
const app = express()

const PORT=3001

app.use(cors())

app.use(express.json())

dotenv.config()

connectDB()

app.use("/api/todos",todoRouter)
app.use("/api/auth", signUpRouter)
app.use("/api/auth", logInRouter)

app.listen(PORT, ()=>{
     
    console.log("server is running on", PORT)
    
})