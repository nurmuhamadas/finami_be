import { TransactionDataType } from './entities/types'

export type GetTransactionResult = TransactionDataType & {
  user_name: string
}

export type GetTransactionsResult = GetTransactionResult[]
