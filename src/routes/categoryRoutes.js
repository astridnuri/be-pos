import { Router } from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory } from "../controllers/CategoryController.js";

const router = Router()

router.get("/", getAllCategories)
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);

export default router