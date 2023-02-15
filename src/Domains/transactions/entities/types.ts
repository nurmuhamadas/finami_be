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
