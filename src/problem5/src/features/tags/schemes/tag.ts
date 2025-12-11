import Joi, { ObjectSchema } from "joi";

const addTagSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(3).max(30).messages({
      'string.base': 'Name should be a type of string',
      'string.min': 'Minimum name length should be 3',
      'string.max': 'Maximum name length should be 30',
      'string.empty': 'Name is a required field'
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description should be a type of string',
      'string.empty': 'Description is a required field'
    }),
    type: Joi.string().required().messages({
      'string.base': 'Type should be a type of string',
      'string.empty': 'Type is a required field'
    }),
    createdBy: Joi.string().required().messages({
      'string.base': 'Created by should be a type of string',
      'string.empty': 'Created by is a required field'
    })
  }).options({
    abortEarly: false,
  });

const updateTagSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().optional().min(3).max(30).messages({
    'string.base': 'Name should be a type of string',
    'string.min': 'Minimum name length should be 3',
    'string.max': 'Maximum name length should be 30',
    'string.empty': 'Name is a required field'
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description should be a type of string',
    'string.empty': 'Description is a required field'
  }),
  type: Joi.string().optional().messages({
    'string.base': 'Type should be a type of string',
    'string.empty': 'Type is a required field'
  }),
  createdBy: Joi.string().optional().messages({
    'string.base': 'Created by should be a type of string',
    'string.empty': 'Created by is a required field'
  })
}).options({
  abortEarly: false,
});

export { addTagSchema, updateTagSchema };
