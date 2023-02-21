import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const getTransactionSchema = Joi.object({
  child_id: Joi.string().max(20),
  transaction_type: Joi.string().allow('in', 'out'),
  date_range: Joi.array().length(2).items(Joi.date()),
  category_id: Joi.string().max(20),
  wallet_id: Joi.string().max(20),
  search_key: Joi.string(),
  limit: Joi.number(),
  offset: Joi.number(),
  order_by: Joi.string().allow('amont').required(),
  sort_by: Joi.string().allow('asc', 'desc').required(),
})

export const postTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  transaction_type: Joi.string().allow('in', 'out').required(),
  image_url: Joi.string(),
  category_id: Joi.string().max(20).required(),
  wallet_id: Joi.string().max(20).required(),
})

export const putTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  transaction_type: Joi.string().allow('in', 'out').required(),
  image_url: Joi.string(),
  category_id: Joi.string().max(20).required(),
  wallet_id: Joi.string().max(20).required(),
})
