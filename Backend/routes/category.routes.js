import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { createCategorySchema, updateCategorySchema } from "../validation/validation.schema.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createCategorySchema), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", validate(updateCategorySchema), updateCategory)
router.delete("/:id", deleteCategory);

export default router;
