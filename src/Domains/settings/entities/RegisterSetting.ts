import { RegisterSettingType } from './types'

class RegisterSetting {
  result: RegisterSettingType

  constructor(payload: RegisterSettingType) {
    this._verifyPayload(payload)

    this.result = payload
  }

  _verifyPayload({
    id,
    user_id,
    currency_id,
    date_format,
  }: RegisterSettingType) {
    if (id.startsWith('user-') || id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_ID')

    if (user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_USER_ID')

    if (currency_id.startsWith('category-') || currency_id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_CURRENCY_ID')

    if (
      [
        'yyyy/mm/dd',
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/dd/mm',
        'yyyy-mm-dd',
        'dd-mm-yyyy',
        'mm-dd-yyyy',
        'yyyy-dd-mm',
      ].includes(date_format)
    )
      throw new Error('REGISTER_PLANNING.INVALID_DATE_FORMAT')
  }
}

export default RegisterSetting
