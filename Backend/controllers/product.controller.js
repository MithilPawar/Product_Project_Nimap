import {
  createProduct as createProductModel,
  getProductById as getProductByIdModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
} from "../models/product.model.js";
import { fetchProducts } from "../services/product.service.js";
import { checkCategoryExist } from "../models/category.model.js";

export const createProduct = (req, res, next) => {
  const { product_name, category_id } = req.body;

  checkCategoryExist(category_id, (err, result) => {
    if (err) return next(err);

    if (!result || result.length === 0) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }

    createProductModel(product_name, category_id, (err) => {
      if (err) return next(err);

      return res.status(201).json({
        message: "Product created successfully",
      });
    });
  });
};

export const getProducts = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  fetchProducts(page, limit, (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result);
  });
};

export const getProductById = (req, res, next) => {
  const { id } = req.params;

  getProductByIdModel(id, (err, result) => {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result[0]);
  });
};

export const updateProduct = (req, res, next) => {
  const { id } = req.params;
  const { product_name, category_id } = req.body;

  checkCategoryExist(category_id, (err, result) => {
    if (err) return next(err);

    if (!result || result.length === 0) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }

    updateProductModel(id, product_name, category_id, (err, result) => {
      if (err) return next(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product updated successfully",
      });
    });
  });
};

export const deleteProduct = (req, res, next) => {
  const { id } = req.params;

  deleteProductModel(id, (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  });
};
