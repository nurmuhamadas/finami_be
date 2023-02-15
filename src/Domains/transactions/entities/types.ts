import { TransactionTypesType } from 'Commons/types'

export type RegisterTransactionType = {
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
  deleted_at?: Date
}

export type UpdateDataTransactionType = {
  amount: number
  description: string
  user_id: string
  category_id: string
  wallet_id: string
  transaction_type: TransactionTypesType
  image_url?: string
  date: Date
  updated_at: Date
}

export type TransactionFilter = {
  transaction_type?: TransactionTypesType
  limit?: number
  date_range?: Date[]
  category_id?: string
  search_key?: string
  wallet_id?: string
  sort_by: 'amount'
  order_by: 'asc' | 'desc'
}

export type TransactionDataType = {
  id: string
  amount: number
  description: string
  user_id: string
  category_id: string
  wallet_id: string
  transaction_type: TransactionTypesType
  image_url: string
  date: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
