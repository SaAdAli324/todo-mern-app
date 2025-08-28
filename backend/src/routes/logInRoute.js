import { logIn } from "../Auth/logIn.js";
import express from "express"

const router = express.Router()

router.post("/logIn", logIn)

export default router