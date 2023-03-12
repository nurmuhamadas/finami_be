import { DateFormatType } from '../../../Commons/types'

export type RegisterSettingResult = {
  id: string
  user_id: string
  currency_id: string
  date_format: DateFormatType
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type RegisterSettingPayload = {
  id: string
  user_id: string
  currency_id: string
  date_format: DateFormatType
}

export type UpdateDataSettingResult = {
  currency_id: string
  date_format: DateFormatType
  updated_at: Date
}

export type UpdateDataSettingPayload = {
  currency_id: string
  date_format: DateFormatType
}

export type SettingDataType = {
  id: string
  user_id: string
  currency_id: string
  date_format:
    | 'yyyy/mm/dd'
    | 'dd/mm/yyyy'
    | 'mm/dd/yyyy'
    | 'yyyy/dd/mm'
    | 'yyyy-mm-dd'
    | 'dd-mm-yyyy'
    | 'mm-dd-yyyy'
    | 'yyyy-dd-mm'
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
