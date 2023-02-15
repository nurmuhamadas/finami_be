import { TransactionTypesType } from 'Commons/types'

export type RegisterCategoriesType = {
  id: string
  name: string
  icon_url?: string
  transaction_type: TransactionTypesType
  user_id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
