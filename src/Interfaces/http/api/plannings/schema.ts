import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const getPlanningsSchema = Joi.object({
  child_id: Joi.string(),
  start_month: Joi.date(),
  end_month: Joi.date(),
  wallet_id: Joi.string(),
})

export const postPlanningSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  month: Joi.date().required(),
  category_id: Joi.string().required(),
  wallet_id: Joi.string().required(),
})

export const putPlanningSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  category_id: Joi.string().required(),
  wallet_id: Joi.string().required(),
})
