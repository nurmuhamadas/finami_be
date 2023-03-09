import { TransactionDataType } from './entities/types'

export type GetTransactionResult = TransactionDataType & {
  user_name: string
  category_name: string
  wallet_name: string
  is_owner: boolean
}

export type GetTransactionsResult = GetTransactionResult[]
