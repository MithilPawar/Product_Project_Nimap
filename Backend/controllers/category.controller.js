import {
  createCategory as createCategoryModel,
  getCategories as getCategoriesModel,
  getCategoryById as getCategoryByIdModel,
  updateCategory as updateCategoryModel,
  deleteCategory as deleteCategoryModel,
} from "../models/category.model.js";
import { sendSuccess } from "../utils/responseHandler.js";

export const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;

    await createCategoryModel(category_name);
    sendSuccess(res, 201, "Category created successfully");
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesModel();
    sendSuccess(res, 200, "Categories fetched successfully", categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await getCategoryByIdModel(id);

    if (!category || category.length === 0) {
      return next(new Error("Category not found"));
    }

    sendSuccess(res, 200, "Category fetched successfully", category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const result = await updateCategoryModel(id, category_name);

    if (result.affectedRows === 0) {
      return next(new Error("Category not found"));
    }

    sendSuccess(res, 200, "Category updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteCategoryModel(id);

    if (result.affectedRows === 0) {
      return next(new Error("Category not found"));
    }

    sendSuccess(res, 200, "Category deleted successfully");
  } catch (err) {
    next(err);
  }
};
