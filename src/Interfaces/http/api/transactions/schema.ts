import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const getTransactionSchema = Joi.object({
  child_id: Joi.string(),
  transaction_type: Joi.string(),
  start_date: Joi.date(),
  end_date: Joi.date(),
  category_id: Joi.string(),
  wallet_id: Joi.string(),
  search_key: Joi.string(),
  limit: Joi.number(),
  offset: Joi.number(),
  order_by: Joi.string().default('desc'),
  sort_by: Joi.string().default('date'),
})

export const postTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  transaction_type: Joi.string().required(),
  image_url: Joi.string(),
  category_id: Joi.string().required(),
  wallet_id: Joi.string().required(),
})

export const putTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  transaction_type: Joi.string().required(),
  image_url: Joi.string(),
  category_id: Joi.string().required(),
  wallet_id: Joi.string().required(),
})
