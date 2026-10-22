import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js"
import { validate } from "../middlewares/validationMiddleware.js";

const router = Router()

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router