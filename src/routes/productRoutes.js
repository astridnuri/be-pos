import { Router } from "express";
import {getAllProducts, getProductById} from "../controllers/productController.js"

const router = Router()

router.get("/", getAllProducts);
router.get("/:id", getProductById);
// router.post("/", createCategory);
// router.put("/:id", updateCategory);

export default router