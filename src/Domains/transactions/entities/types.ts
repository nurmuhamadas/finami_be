import { TransactionTypesType } from '../../../Commons/types'

export type RegisterTransactionPayload = {
  id: string
  amount: number
  description: string
  user_id: string
  category_id: string
  wallet_id: string
  transaction_type: TransactionTypesType
  image_url?: string
  date: Date
}

export type RegisterTransactionResult = {
  id: string
  amount: number
  description: string
  user_id: string
  category_id: string
  wallet_id: string
  transaction_type: TransactionTypesType
  image_url?: string
  date: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export type UpdateDataTransactionPayload = {
  amount: number
  description: string
  category_id: string
  transaction_type: TransactionTypesType
  image_url?: string
  date: Date
}

export type UpdateDataTransactionResult = {
  amount: number
  description: string
  category_id: string
  transaction_type: TransactionTypesType
  image_url?: string
  date: Date
  updated_at: Date
}

export type TransactionFilterType = {
  transaction_type?: TransactionTypesType
  limit?: number
  offset?: number
  date_range?: Date[]
  category_id?: string
  search_key?: string
  wallet_id?: string
  sort_by: 'amount'
  order_by: 'asc' | 'desc'
}

export type TransactionDataRespType = {
  id: string
  amount: number
  description: string
  date: Date
  transaction_type: TransactionTypesType
  image_url: string
  user_id: string
  user_name: string
  user_fullname: string
  category_id: string
  category_name: string
  category_icon: string
  wallet_id: string
  wallet_name: string
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
