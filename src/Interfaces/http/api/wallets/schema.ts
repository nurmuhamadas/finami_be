import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const postWalletSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required(),
})

export const putWalletSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required(),
})

export const getWalletsSchema = Joi.object({
  user_id: Joi.string(),
})
