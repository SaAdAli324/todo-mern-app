import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/database/dataBase.js'
import todoRouter from './src/routes/todosRoutes.js'
import signUpRouter from './src/routes/signUpRoute.js'
import logInRouter from './src/routes/logInRoute.js'

import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config() // ✅ load .env first

const app = express()
const PORT = process.env.PORT || 3001


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json())

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Connect DB
connectDB()

// ---------- API ROUTES ----------
app.use('/api/todos', todoRouter)
app.use('/api/auth/sign', signUpRouter)
app.use('/api/auth/log', logInRouter)


app.use(express.static(path.join(__dirname,'dist')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
