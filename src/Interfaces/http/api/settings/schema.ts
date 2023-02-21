import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import * as JoiType from 'joi'

const Joi: typeof JoiType = require('joi')

export const putSettingSchema = Joi.object({
  wallet_id: Joi.string().max(20).required(),
  date_format: Joi.string()
    .allow(
      'yyyy/mm/dd',
      'dd/mm/yyyy',
      'mm/dd/yyyy',
      'yyyy/dd/mm',
      'yyyy-mm-dd',
      'dd-mm-yyyy',
      'mm-dd-yyyy',
      'yyyy-dd-mm',
    )
    .required(),
})
