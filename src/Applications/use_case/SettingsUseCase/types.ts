import {
  CategoryGroupsType,
  DateFormatType,
  IdGeneratorType,
  TransactionTypesType,
} from 'Commons/types'
import SettingRepository from 'Domains/settings/SettingRepository'

export type SettingsUseCaseType = {
  idGenerator: IdGeneratorType
  settingRepository: SettingRepository
}

export type GetSettingByUserIdPayload = {
  user_id: string
}

export type GetSettingByIdPayload = {
  id: string
  user_id: string
}

export type AddSettingPayload = {
  date_format: DateFormatType
  currency_id: string
  user_id: string
}

export type UpdateSettingPayload = {
  id: string
  date_format: DateFormatType
  currency_id: string
}

export type DeleteSettingPayload = {
  id: string
  user_id: string
}
