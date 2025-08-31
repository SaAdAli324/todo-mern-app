import express from "express"
import { getTodo , postTodo , deleteTodo , updateTodo , patchToggle} from "../controllers/requestContoller.js"
import { authMiddleWare } from "../middleware/authMiddleWare.js"

const router = express.Router()
router.use(authMiddleWare)
router.get("/",getTodo)
router.post("/", postTodo)
router.put("/:id",updateTodo)
router.delete("/:id",deleteTodo)
router.patch("/:id/toggle",patchToggle)


export default router