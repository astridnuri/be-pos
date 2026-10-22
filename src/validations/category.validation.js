import Joi from "joi";

//create user
export const createCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
});

//update user
export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
});