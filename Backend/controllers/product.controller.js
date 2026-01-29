import {
  createProduct as createProductModel,
  getProductById as getProductByIdModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
} from "../models/product.model.js";
import { fetchProducts } from "../services/product.service.js";
import { checkCategoryExist } from "../models/category.model.js";
import { sendSuccess } from "../utils/responseHandler.js";

export const createProduct = async (req, res, next) => {
  try {
    const { product_name, category_id } = req.body;

    const categoryExists = await checkCategoryExist(category_id);

    if (!categoryExists) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }

    await createProductModel(product_name, category_id);

    sendSuccess(res, 201, "Product created successfully");
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await fetchProducts(page, limit);

    sendSuccess(res, 200, "Products fetched successfully", result);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdModel(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    sendSuccess(res, 200, "Product fetched successfully", product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product_name, category_id } = req.body;

    const categoryExists = await checkCategoryExist(category_id);

    if (!categoryExists) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }

    const result = await updateProductModel(id, product_name, category_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    sendSuccess(res, 200, "Product updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductModel(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    sendSuccess(res, 200, "Product deleted successfully");
  } catch (err) {
    next(err);
  }
};
