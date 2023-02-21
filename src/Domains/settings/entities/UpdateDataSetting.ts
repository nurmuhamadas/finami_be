import { UpdateDataSettingResult, UpdateDataSettingPayload } from './types'

class UpdateDataSetting {
  values: UpdateDataSettingResult

  constructor(payload: UpdateDataSettingPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      updated_at: new Date(),
    }
  }

  _verifyPayload({ currency_id, date_format }: UpdateDataSettingPayload) {
    if (!currency_id.startsWith('currency-'))
      throw new Error('UPDATE_DATA_SETTING.INVALID_CURRENCY_ID')

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
      throw new Error('UPDATE_DATA_SETTING.INVALID_DATE_FORMAT')
  }
}

export default UpdateDataSetting
