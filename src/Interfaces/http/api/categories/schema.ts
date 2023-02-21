import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const getCategoriesSchema = Joi.object({
  transaction_type: Joi.string().allow('in', 'out'),
})

export const postCategorySchema = Joi.object({
  name: Joi.string().required(),
  icon_url: Joi.string(),
  transaction_type: Joi.string().allow('in', 'out').required(),
  group: Joi.string()
    .allow(
      'Required Expense',
      'Irregular Expense',
      'Invensting and Debt Payment',
      'Fun and Relax',
      'Income',
    )
    .required(),
})

export const putCategorySchema = Joi.object({
  name: Joi.string().required(),
  icon_url: Joi.string(),
  transaction_type: Joi.string().allow('in', 'out').required(),
  group: Joi.string()
    .allow(
      'Required Expense',
      'Irregular Expense',
      'Invensting and Debt Payment',
      'Fun and Relax',
      'Income',
    )
    .required(),
})
