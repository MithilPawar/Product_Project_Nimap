import { getProductsFromDB } from "../models/product.model.js";

export const fetchProducts = async (page, limit) => {
  const offset = (page - 1) * limit;
  const { products, total } = await getProductsFromDB(limit, offset);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: products,
  };
};
