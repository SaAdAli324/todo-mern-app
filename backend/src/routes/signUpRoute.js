import express from 'express'
import { signUP } from '../Auth/signUP.js'

const router = express.Router()

router.post("/signUp",signUP)

export default router