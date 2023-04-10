import { TransactionTypesType } from '../../Commons/types'

export type TransactionDataRepoType = {
  id: string
  amount: string
  descriptions: string
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
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
