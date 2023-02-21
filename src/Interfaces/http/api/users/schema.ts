import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const postUserSchema = Joi.object({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  image_url: Joi.string(),
  parent_id: Joi.string().max(20),
})

export const putUserSchema = Joi.object({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  image_url: Joi.string(),
})
