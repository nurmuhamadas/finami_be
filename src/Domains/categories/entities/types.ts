import { CategoryGroupsType, TransactionTypesType } from 'Commons/types'

export type RegisterCategoryType = {
  id: string
  name: string
  icon_url?: string
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type UpdateDataCategoryType = {
  name: string
  icon_url?: string
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
  updated_at: Date
}

export type CategoryFilter = {
  transaction_type?: TransactionTypesType
}

export type CategoryDataType = {
  id: string
  name: string
  icon_url: string
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}
