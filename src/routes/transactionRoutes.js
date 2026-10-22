import { Router } from "express";
import { createTransaction, getAllTransaction, getTransactionById } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/middleware.js";

const router = Router()

router.use(verifyToken)
router.get("/", getAllTransaction);
router.post("/", createTransaction)
router.get("/:id", getTransactionById)

export default router