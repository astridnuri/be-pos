import { Router } from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/CategoryController.js";
import { createCategorySchema, updateCategorySchema } from "../validations/category.validation.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = Router()

router.get("/", getAllCategories)
router.get("/:id", getCategoryById);
router.post("/", validate(createCategorySchema), createCategory);
router.put("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router