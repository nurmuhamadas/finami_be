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
  image: Joi.object({
    hapi: Joi.object({
      headers: Joi.object({
        'content-type': Joi.string()
          .valid('image/jpeg', 'image/png')
          .required(),
      }).unknown(),
      filename: Joi.string().required(),
    }),
    _data: Joi.binary()
      .max(1024 * 1024 * 5)
      .required(),
  }).options({ stripUnknown: true }),
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
