import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/middleware.js"
import { createUserSchema, updateUserSchema } from "../validations/user.validation.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = Router()

router.use(verifyToken)
router.get('/', getAllUser)
router.get('/:id', getUserById)
router.post('/',validate(createUserSchema), createUser) //krn ada inputan
router.put("/:id", validate(updateUserSchema), updateUser)
router.delete("/:id", deleteUser)

export default router