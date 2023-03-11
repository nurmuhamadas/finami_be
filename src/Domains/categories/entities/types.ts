import { CategoryGroupsType, TransactionTypesType } from 'Commons/types'

export type RegisterCategoryResult = {
  id: string
  name: string
  icon_url?: string | null
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type RegisterCategoryPayload = {
  id: string
  name: string
  icon_url?: string | null
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
}

export type UpdateDataCategoryResult = {
  name: string
  icon_url?: string | null
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
  updated_at: Date
}

export type UpdateDataCategoryPayload = {
  name: string
  icon_url?: string
  transaction_type: TransactionTypesType
  user_id: string
  group: CategoryGroupsType
}

export type CategoryFilter = {
  transaction_type?: TransactionTypesType
  include_child?: boolean
}

export type CategoryDataRespType = {
  id: string
  name: string
  icon_url: string
  transaction_type: TransactionTypesType
  group: CategoryGroupsType
  user_id: string
  user_name: string
  user_fullname: string
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
