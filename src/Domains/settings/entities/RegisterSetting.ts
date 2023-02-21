import { RegisterSettingResult, RegisterSettingPayload } from './types'

class RegisterSetting {
  values: RegisterSettingResult

  constructor(payload: RegisterSettingPayload) {
    this._verifyPayload(payload)

    const now = new Date()
    this.values = {
      ...payload,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

  _verifyPayload({
    id,
    user_id,
    currency_id,
    date_format,
  }: RegisterSettingPayload) {
    if (!id.startsWith('setting-') || id.length !== 20)
      throw new Error('REGISTER_SETTING.INVALID_ID')

    if (!user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_SETTING.INVALID_USER_ID')

    if (!currency_id.startsWith('currency-'))
      throw new Error('REGISTER_SETTING.INVALID_CURRENCY_ID')

    if (
      ![
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
      throw new Error('REGISTER_SETTING.INVALID_DATE_FORMAT')
  }
}

export default RegisterSetting
