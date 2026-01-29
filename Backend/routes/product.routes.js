import express from "express";
import { createProductSchema, updateProductSchema } from "../validation/validation.schema.js";
import validate from "../middlewares/validate.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
