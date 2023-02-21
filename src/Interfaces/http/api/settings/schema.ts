import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const putSettingSchema = Joi.object({
  currency_id: Joi.string().required(),
  date_format: Joi.string().required(),
})
