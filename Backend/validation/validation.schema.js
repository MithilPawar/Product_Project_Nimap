import Joi from "joi";

export const createCategorySchema = Joi.object({
  category_name: Joi.string().min(2).required(),
});

export const updateCategorySchema = Joi.object({
  category_name: Joi.string().min(2).optional(),
});

export const createProductSchema = Joi.object({
  product_name: Joi.string().min(2).required(),
  category_id: Joi.number().integer().required(),
});

export const updateProductSchema = Joi.object({
  product_name: Joi.string().min(2).optional(),
  category_id: Joi.number().integer().optional(),
});
