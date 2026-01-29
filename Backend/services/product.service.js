import { getProducts } from "../models/product.model.js";

export const fetchProducts = (page, limit, cb) => {
  const offset = (page - 1) * limit;
  getProducts(limit, offset, cb);
};
