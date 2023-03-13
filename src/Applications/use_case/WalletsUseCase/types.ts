import UserRepository from '../../../Domains/users/UserRepository'
import IdGenerator from '../../../Applications/common/IdGenerator'
import WalletRepository from '../../../Domains/wallets/WalletRepository'
import TransactionRepository from '../../../Domains/transactions/TransactionRepository'
import PlanningRepository from 'Domains/plannings/PlanningRepository'

export type WalletUseCaseType = {
  idGenerator: IdGenerator
  walletRepository: WalletRepository
  userRepository: UserRepository
  transactionRepository: TransactionRepository
  planningRepository: PlanningRepository
}

export type GetWalletsPayload = {
  user_id: string
  user_id_query?: string
}

export type GetWalletByIdPayload = {
  user_id: string
  wallet_id: string
}

export type AddWalletPayload = {
  name: string
  balance: number
  userId: string
}

export type UpdateWalletPayload = {
  name: string
  balance: number
  userId: string
  walletId: string
}

export type DeleteWalletPayload = {
  walletId: string
  userId: string
}

export type RestoreWalletPayload = {
  walletId: string
  userId: string
}
