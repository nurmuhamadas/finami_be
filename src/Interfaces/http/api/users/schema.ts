import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const postUserSchema = Joi.object({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(8).required(),
  fullname: Joi.string().required(),
  image_url: Joi.string(),
})

export const putUserSchema = Joi.object({
  username: Joi.string().max(30).required(),
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  image_url: Joi.string(),
})

export const postMemberSchema = Joi.object({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(8).required(),
  fullname: Joi.string().required(),
  image_url: Joi.string(),
})

export const putMemberSchema = Joi.object({
  username: Joi.string().max(30).required(),
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  image_url: Joi.string(),
  user_id: Joi.string().required(),
})

export const getUserMembersSchema = Joi.object({
  member_only: Joi.boolean().default(false),
})
