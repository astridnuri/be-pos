import Joi from "joi";

//create user
export const createProductSchema = Joi.object({
  category_id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  description: Joi.string().trim().optional(),
  is_active: Joi.string().required(),
});

//update user
export const updateProductSchema = Joi.object({
  category_id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  description: Joi.string().trim().optional(),
  is_active: Joi.string().required(),
});