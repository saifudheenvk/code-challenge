import Joi, { ObjectSchema } from "joi";

const createUserSchema: ObjectSchema = Joi.object().keys({
    password: Joi.string().required().min(8).max(32).messages({
      'string.base': 'Password should be a type of string',
      'string.min': 'Password must have a minimum length of {#limit}',
      'string.max': 'Password should have a maximum length of {#limit}',
      'string.empty': 'Password is a required field'
    }),
    name: Joi.string().required().min(3).max(30).messages({
      'string.base': 'Name should be a type of string',
      'string.min': 'Minimum name length should be 3',
      'string.max': 'Maximum name length should be 30',
      'string.empty': 'Name is a required field'
    }),
    age: Joi.number().required().min(18).max(100).messages({
      'number.base': 'Age should be a type of number',
      'number.min': 'Minimum age should be 18',
      'number.max': 'Maximum age should be 100',
      'number.empty': 'Age is a required field'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email should be a valid email address',
      'string.empty': 'Email is a required field'
    })
  });

const updateUserSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().optional().min(3).max(30).messages({
      'string.base': 'Name should be a type of string',
      'string.min': 'Minimum name length should be 3',
      'string.max': 'Maximum name length should be 30',
      'string.empty': 'Name is a required field'
    }),
    age: Joi.number().optional().min(18).max(100).messages({
      'number.base': 'Age should be a type of number',
      'number.min': 'Minimum age should be 18',
      'number.max': 'Maximum age should be 100',
      'number.empty': 'Age is a required field'
    }),
    email: Joi.string().email().optional().messages({
      'string.email': 'Email should be a valid email address',
      'string.empty': 'Email is a required field'
    })
  }).options({
    abortEarly: false,
  });

export { createUserSchema, updateUserSchema };