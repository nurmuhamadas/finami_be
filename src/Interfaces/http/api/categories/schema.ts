import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const getCategoriesSchema = Joi.object({
  transaction_type: Joi.string().valid('in', 'out'),
  user_id: Joi.string(),
})

export const postCategorySchema = Joi.object({
  name: Joi.string().required(),
  icon: Joi.object({
    hapi: Joi.object({
      headers: Joi.object({
        'content-type': Joi.string()
          .valid('image/jpeg', 'image/png')
          .required(),
      }).unknown(),
      filename: Joi.string().required(),
    }),
    _data: Joi.binary()
      .max(1024 * 1024 * 2)
      .required(),
  })
    .required()
    .options({ stripUnknown: true }),
  transaction_type: Joi.string().required(),
  group: Joi.string().required(),
})

export const putCategorySchema = Joi.object({
  name: Joi.string().required(),
  icon_url: Joi.string(),
  transaction_type: Joi.string().required(),
  group: Joi.string().required(),
})
