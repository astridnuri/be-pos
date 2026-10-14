import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/middleware.js"

const router = Router()

router.use(verifyToken)
router.get('/', getAllUser)
router.get('/:id', getUserById)
router.post('/', createUser) //krn ada inputan
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router