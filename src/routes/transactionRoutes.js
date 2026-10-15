import { Router } from "express";
import { createTransaction, getAllTransaction } from "../controllers/transactionController.js";

const router = Router()

router.get("/", getAllTransaction);
router.post("/", createTransaction)

export default router