import {
  IdGeneratorType,
  OrderByType,
  TransactionTypesType,
} from 'Commons/types'
import CategoryRepository from 'Domains/categories/CategoryRepository'
import TransactionRepository from 'Domains/transactions/TransactionRepository'
import WalletRepository from 'Domains/wallets/WalletRepository'

export type TransactionsUseCaseType = {
  idGenerator: IdGeneratorType
  transactionRepository: TransactionRepository
  walletRepository: WalletRepository
  categoryRepository: CategoryRepository
}

export type GetTransactionPayload = {
  user_id: string
  child_id?: string
  transaction_type?: TransactionTypesType
  date_range?: Date[]
  category_id?: string
  wallet_id?: string
  search_key?: string
  limit?: number
  offset?: number
  sort_by: 'amount'
  order_by: OrderByType
}

export type AddTransactionPayload = {
  amount: number
  description: string
  user_id: string
  category_id: string
  wallet_id: string
  transaction_type: TransactionTypesType
  date: Date
  image_url: string
}

export type UpdateTransactionPayload = {
  id: string
  amount: number
  description: string
  category_id: string
  transaction_type: TransactionTypesType
  date: Date
  image_url: string
  wallet_id: string
  user_id: string
}

export type DeleteTransactionPayload = {
  id: string
  user_id: string
}
