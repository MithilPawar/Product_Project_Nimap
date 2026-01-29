import {
  createCategory as createCategoryModel,
  getCategories as getCategoriesModel,
  getCategoryById as getCategoryByIdModel,
  updateCategory as updateCategoryModel,
  deleteCategory as deleteCategoryModel,
} from "../models/category.model.js";

export const createCategory = (req, res, next) => {
  const { category_name } = req.body;

  createCategoryModel(category_name, (err, results) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      message: "Category created successfully",
    });
  });
};

export const getCategories = (req, res, next) => {
  getCategoriesModel((err, results) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(results);
  });
};

export const getCategoryById = (req, res, next) => {
  const { id } = req.params;

  getCategoryByIdModel(id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(results);
  });
};

export const updateCategory = (req, res, next) => {
  const { id } = req.params;
  const { category_name } = req.body;

  updateCategoryModel(id, category_name, (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.affectedRows === 0) {
      res.status(404);
      return next(new Error("Category not found"));
    }
    res.status(200).json({
      message: "Category updated successfully",
    });
  });
};

export const deleteCategory = (req, res, next) => {
  const { id } = req.params;

  deleteCategoryModel(id, (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.affectedRows === 0) {
      res.status(404);
      return next(new Error("Category not found"));
    }
    res.status(200).json({
      message: "Category deleted successfully",
    });
  });
};
